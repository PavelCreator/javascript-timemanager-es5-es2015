timer = {
  startOrStop() {
    if (data.flag.stop) {
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
    if (!data.flag.stop) {
      this.stop();
      data.flag.stop = true;
    }
    timerSvc.fromSecToTime();
    view.renewClockFace();
  },
  start() {
    view.startOrStop('start');
    timerSvc.getValuesFromHTML();
    timerSvc.fromTimeToSec();
    if (data.timeInSec == 0) {
      if (data.flag.sound) {
        if ((!data.flag.stop) && (data.timeInSec == 0)) {
          view.playSound();
        } else {
          if (data.flag.finish) {
            view.warning.finishOff();
          }
        }
      }
    }
    oneSec = setTimeout(function () {
      if ((data.timeInSec !== 0) && (data.timeInSec <= 6) && (!data.flag.reverse)) {
        view.ending.set();
      }
      if (data.timeInSec == 0) {
        if (data.flag.finish) {
          clearTimeout(oneSec);
          view.startOrStop('stop');
          return false;
        }
        view.ending.unset();
        view.reverse.set();
      }
      if (data.flag.reverse) {
        view.warning.reset();
        data.timeInSec++;
      } else {
        data.timeInSec--;
      }
      data.flag.stop = false;
      timerSvc.fromSecToTime();
      view.renewClockFace();
      timer.start();
    }, 1000);
  },
  stop() {
    view.startOrStop('stop');
    clearTimeout(oneSec);
    data.flag.stop = true;
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