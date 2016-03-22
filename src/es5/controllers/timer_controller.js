function Timer() {
  var start = function () {

    data.flag.undouble++;
    console.log(data.flag.undouble);
    if (data.flag.undouble > 1) {
      setTimeout(function () {
        data.flag.undouble = 0;
      }, 1000);
    }

    view.startOrStop('start');
    timerSvc.getValuesFromHTML();
    timerSvc.fromTimeToSec();
    if (data.timeInSec == 0) {
      if (data.flag.sound) {
        if ((!data.flag.stop) && (data.timeInSec == 0)) {
          view.setMelodyPlay(true);
        } else {
          if ((data.flag.finish) && (data.flag.mode === 'timer')) {
            view.warning.finishOff();
            setTimeout(function () {
              view.startOrStop('stop');
            }, 1000);
            clearInterval(oneSec);
            return;
          }
        }
      }
    }
    data.flag.stop = false;
    oneSec = setInterval(function () {
      data.flag.undouble = 0;
      if ((data.timeInSec !== 0) && (data.timeInSec <= 6) && (!data.flag.reverse)) {
        view.ending.set();
      }
      if (data.timeInSec == 0) {
        if ((data.flag.finish) && (data.flag.mode === 'timer')) {
          clearInterval(oneSec);
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
    }, 1000);
  };
  this.stop = function () {
    view.startOrStop('stop');
    clearInterval(oneSec);
    data.flag.stop = true;
  };
  this.startOrStop = function () {
    if (data.flag.stop) {
      start();
    } else {
      view.stopSound();
      this.stop();
    }
  };
  this.set = function (timeInMin) {
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
  };
  this.changeMode = function (mode) {
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
  };
}
timer = new Timer();