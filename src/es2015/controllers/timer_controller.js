class Timer {
  start () {
    view.startOrStop('start');
    timerSvc.getValuesFromHTML();
    timerSvc.fromTimeToSec();

    if ((data.flag.finish) && (data.flag.mode === 'timer') && (data.timeInSec == 0)) {
      view.warning.finishOff();
      setTimeout(function () {
        view.startOrStop('stop');
      }, 1000);
      return;
    }

    data.flag.undouble++;
    console.log(data.flag.undouble);
    if (data.flag.undouble > 1) {
      return;
    }

    oneSec = setInterval(function () {
      data.flag.undouble = 0;
      if ((data.flag.sound) && (!data.flag.stop) && (data.timeInSec == 1) && (!data.flag.reverse)) {
        view.setMelodyPlay(true);
      }
      data.flag.stop = false;
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
  stop () {
    data.flag.undouble = 0;
    view.startOrStop('stop');
    clearInterval(oneSec);
    data.flag.stop = true;
  };
  startOrStop () {
    if (data.flag.stop) {
      this.start();
    } else {
      view.stopSound();
      this.stop();
    }
  };
  set (timeInMin) {
    if (timeInMin == 0) view.startOrStop('stop');
    if (data.flag.mode === 'timer') {
      view.reset();
    }
    data.timeInSec = timeInMin * 60;

    this.stop();
    data.flag.stop = true;
    data.flag.undouble = 0;

    timerSvc.fromSecToTime();
    view.renewClockFace();
  };
  changeMode (mode) {
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