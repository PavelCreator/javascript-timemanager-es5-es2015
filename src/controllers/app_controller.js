var timer = {
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
    view.reset();
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
    if ((data.timeInSec !== 0) && (data.timeInSec <= 6) && (!data.flag.reverse)) {
      view.ending.set();
    }
    if (data.timeInSec == 0) {
      if (data.flag.sound) {
        if ((!data.flag.stop) && (data.timeInSec == 0)) view.playSound();
      }
      if (data.flag.finish) {
        clearTimeout(oneSec);
        view.startOrStop('stop');
        return false;
      }
      view.ending.unset();
      view.reverse.set();
    }
    if (data.flag.reverse) {
      data.timeInSec++;
    } else {
      data.timeInSec--;
    }
    data.flag.stop = false;
    timerSvc.fromSecToTime();
    view.renewClockFace();
    oneSec = setTimeout(function () {
      timer.start();
    }, 1000);
  },
  stop: function () {
    view.startOrStop('stop');
    clearTimeout(oneSec);
    data.flag.stop = true;
  },
}
