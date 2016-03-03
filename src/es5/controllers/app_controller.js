timer = {
  startOrStop: function () {
    if (data.flag.stop) {
      this.start();
    } else {
      view.stopSound();
      this.stop();
    }
  },
  set: function (timeInMin) {
    if (timeInMin == 0) view.startOrStop('stop');
    if (data.flag.mode === 'timer') {
      view.reset();
    }
    data.timeInSec = timeInMin * 60;
    if (!data.flag.stop) {
      this.stop();
      data.flag.stop = true;
    }
    timerSvc.fromSecToTime();
    view.renewClockFace();
  },
  start: function () {
    view.startOrStop('start');
    timerSvc.getValuesFromHTML();
    timerSvc.fromTimeToSec();
    if (data.timeInSec == 0) {
      if (data.flag.sound) {
        if ((!data.flag.stop) && (data.timeInSec == 0)) {
          view.playSound();
        } else {
          if ((data.flag.finish)) {
            view.warning.finishOff();
          }
        }
      }
    }
    data.flag.stop = false;
    oneSec = setTimeout(function () {
      if ((data.timeInSec !== 0) && (data.timeInSec <= 6) && (!data.flag.reverse)) {
        view.ending.set();
      }
      if (data.timeInSec == 0) {
        if ((data.flag.finish) && (data.flag.mode === 'timer')) {
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

      timerSvc.fromSecToTime();
      view.renewClockFace();
      timer.start();
    }, 1000);
  },
  stop: function () {
    view.startOrStop('stop');
    clearTimeout(oneSec);
    data.flag.stop = true;
  },
  changeMode: function (mode) {
    if (mode === undefined) {
      switch (data.flag.mode) {
        case 'timer':
          data.flag.mode = 'stopwatch';
          break;

        case 'stopwatch':
          data.flag.mode = 'watch';
          break;

        case 'watch':
          data.flag.mode = 'timer';
          break;
      }
    } else {
      data.flag.mode = mode;
    }
    this.set(0);
  }
}
watch = {
  start: function () {
    var d = new Date();
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());
    var currentTime = h + '<span>:</span>' + m
    if (document.getElementById('w-hour').value != h) {
      document.getElementById('w-hour').value = h;
    }
    if (document.getElementById('w-min').value != m) {
      document.getElementById('w-min').value = m;
    }
    if (document.getElementById('w-sec').value != s) {
      document.getElementById('w-sec').value = s;
      if (data.flag.mode === 'watch') {
        view.renewTitle.watch(h, m, s);
      }
    }
    if (document.getElementById('watch').innerHTML != currentTime) {
      document.getElementById('watch').innerHTML = currentTime;
    }
    setTimeout(function () {
      watch.start();
    }, 1000);
  }
}