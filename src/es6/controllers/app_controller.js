timer = {
  startOrStop() {
    if (data.flag.get('stop')) {
      this.start();
    } else {
      view.stopSound();
      this.stop();
    }
  },
  set(timeInMin) {
    if (timeInMin == 0) view.startOrStop('stop');
    view.reset();
    data.timeInSec = timeInMin * 60;
    if (!data.flag.get('stop')) {
      this.stop();
      data.flag.set('stop', true);
    }
    timerSvc.fromSecToTime();
    view.renewClockFace();
  },
  start() {
    view.startOrStop('start');
    timerSvc.getValuesFromHTML();
    timerSvc.fromTimeToSec();
    if (data.timeInSec == 0) {
      if (data.flag.get('sound')) {
        if ((!data.flag.get('stop')) && (data.timeInSec == 0)) {
          view.playSound();
        } else {
          if (data.flag.get('finish')) {
            view.warning.finishOff();
          }
        }
      }
    }
    oneSec = setTimeout(function () {
      if ((data.timeInSec !== 0) && (data.timeInSec <= 6) && (!data.flag.get('reverse'))) {
        view.ending.set();
      }
      if (data.timeInSec == 0) {
        if (data.flag.get('finish')) {
          clearTimeout(oneSec);
          view.startOrStop('stop');
          return false;
        }
        view.ending.unset();
        view.reverse.set();
      }
      if (data.flag.get('reverse')) {
        view.warning.reset();
        data.timeInSec++;
      } else {
        data.timeInSec--;
      }
      data.flag.set('stop', false);
      timerSvc.fromSecToTime();
      view.renewClockFace();
      timer.start();
    }, 1000);
  },
  stop() {
    view.startOrStop('stop');
    clearTimeout(oneSec);
    data.flag.set('stop', true);
  },
}
watch = {
  start() {
    var d = new Date();
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var currentTime = h+'<span>:</span>'+m
    if (document.getElementById('watch').innerHTML != currentTime){
      document.getElementById('watch').innerHTML = currentTime;
    }
    setTimeout(function () {
      watch.start();
    }, 1000);
  }
}