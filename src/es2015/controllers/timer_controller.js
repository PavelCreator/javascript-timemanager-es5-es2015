class Timer {
  start () {
    view.startOrStop('start');
    timerSvc.getValuesFromHTML();
    timerSvc.fromTimeToSec();

    if ((flag.get('finish')) && (flag.get('mode') === 'timer') && (data.timeInSec == 0)) {
      view.warning.finishOff();
      setTimeout(() => {
        view.startOrStop('stop');
      }, 1000);
      return;
    }
    flag.set('undouble',(flag.get('undouble')+1));

    if (flag.get('undouble') > 1) {
      return;
    }

    oneSec = setInterval(() => {
      flag.set('undouble', 0);
      if ((flag.get('sound')) && (!flag.get('stop')) && (data.timeInSec == 1) && (!flag.get('reverse'))) {
        view.setMelodyPlay(true);
      }
      flag.set('stop', false);
      if ((data.timeInSec !== 0) && (data.timeInSec <= 6) && (!flag.get('reverse'))) {
        view.ending.set();
      }
      if (data.timeInSec == 0) {
        if ((flag.get('finish')) && (flag.get('mode') === 'timer')) {
          clearInterval(oneSec);
          view.startOrStop('stop');
          return false;
        }
        view.ending.unset();
        view.reverse.set();
      }
      if (flag.get('reverse')) {
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
    flag.set('undouble', 0);
    view.startOrStop('stop');
    clearInterval(oneSec);
    flag.set('stop', true);
  };
  startOrStop () {
    if (flag.get('stop')) {
      this.start();
    } else {
      view.stopSound();
      this.stop();
    }
  };
  set (timeInMin) {
    if (timeInMin == 0) view.startOrStop('stop');
    if (flag.get('mode') === 'timer') {
      view.reset();
    }
    data.timeInSec = timeInMin * 60;

    this.stop();
    flag.set('stop', true);
    flag.set('undouble', 0);

    timerSvc.fromSecToTime();
    view.renewClockFace();
  };
  changeMode (mode) {
    if (mode === undefined) {
      switch (flag.get('mode')) {
        case 'timer':
          flag.set('mode', 'stopwatch');
          break;

        case 'stopwatch':
          flag.set('mode', 'watch');
          break;

        case 'watch':
          flag.set('mode', 'timer');
          break;
      }
    } else {
      flag.set('mode', mode);
    }
    this.set(0);
  };
}
timer = new Timer();