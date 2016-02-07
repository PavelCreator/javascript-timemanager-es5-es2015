var timer = {
  time: {
    h: '00',
    m: '00',
    s: '00'
  },
  timeInSec: 0,
  flagStop: true,
  startOrStop: function () {
    if (this.flagStop) {
      console.log('start');
      this.start();
      this.flagStop = false;
    } else {
      console.log('stop');
      this.stop();
    }
  },
  reverse: {
    flag: false,
    set: function () {
      this.flag = true;
      classFnc.add(document.getElementById('clock-face'), 'reverse');
    },
    unset: function () {
      this.flag = false;
      classFnc.remove(document.getElementById('clock-face'), 'reverse');
    }
  },
  ending: {
    set: function () {
      classFnc.add(document.getElementById('clock-face'), 'ending');
    },
    unset: function () {
      classFnc.remove(document.getElementById('clock-face'), 'ending');
    }
  },
  fromTimeValuesFromHTML: function () {
    switch (this.time.h.length) {
      case 2:
        this.time.h = document.getElementById('hour').value;
        break;
      case 1:
        this.time.h = '0' + document.getElementById('hour').value;
        break;
      default:
        this.time.h = '00';
        break;
    };
    switch (this.time.m.length) {
      case 2:
        this.time.m = document.getElementById('min').value;
        break;
      case 1:
        this.time.m = '0' + document.getElementById('min').value;
        break;
      default:
        this.time.m = '00';
        break;
    };
    switch (this.time.s.length) {
      case 2:
        this.time.s = document.getElementById('sec').value;
        break;
      case 1:
        this.time.s = '0' + document.getElementById('sec').value;
        break;
      default:
        this.time.s = '00';
        break;
    };
  },
  start: function () {
    oneSec = setTimeout(function () {
      timer.fromTimeValuesFromHTML();
      timer.fromTimeToSec();
      if ((timer.timeInSec <= 6)&&(!timer.reverse.flag)) {
        timer.ending.set();
      }
      if (timer.timeInSec == 0) {
        timer.ending.unset();
        timer.reverse.set();
      }
      if (timer.reverse.flag) {
        timer.timeInSec++;
      } else {
        timer.timeInSec--;
      }
      timer.fromSecToTime();
      timer.start();
    }, 1000);
  },
  stop: function () {
    clearTimeout(oneSec);
    this.flagStop = true;
  },
  set: function (timeInMin) {
    this.reverse.unset();
    this.ending.unset();
    this.timeInSec = timeInMin * 60;
    if (!this.flagStop) {
      this.stop();
      this.flagStop = true;
    }
    this.fromSecToTime();
  },
  fromTimeToSec: function () {
    if (this.time.s > 59) {
      this.time.s = 60;
    }
    if (this.time.m > 59) {
      this.time.m = 59;
      this.time.s = 60;
    }
    if (this.time.h > 23) {
      this.time.h = 23;
      this.time.m = 59;
      this.time.s = 60;
    }
    this.timeInSec =
      parseFloat(this.time.h) * 3600 +
      parseFloat(this.time.m) * 60 +
      parseFloat(this.time.s);
  },
  fromSecToTime: function () {
    var timeInSec = this.timeInSec;
    //HOUR
    if (timeInSec >= 90000) {
      this.time.h = '24';
    } else {
      if (timeInSec >= 36000) {
        this.time.h = '' + Math.floor(timeInSec / 3600);
      } else {
        if (timeInSec >= 3600) {
          this.time.h = '0' + Math.floor(timeInSec / 3600);
        } else {
          this.time.h = '00';
        }
      }
    }
    //MIN
    var min = Math.floor((timeInSec - parseFloat(this.time.h) * 3600) / 60);
    if (min < 10) {
      this.time.m = '0' + min.toString();
    } else {
      this.time.m = min.toString();
    }
    //SEC
    var sec = Math.floor((timeInSec - parseFloat(this.time.h) * 3600)) - min * 60;
    if (sec < 10) {
      this.time.s = '0' + sec.toString();
    } else {
      this.time.s = sec.toString();
    }
    this.renewView();
  },
  renewView: function () {
    document.getElementById('hour').value = this.time.h;
    document.getElementById('min').value = this.time.m;
    document.getElementById('sec').value = this.time.s;
  }
}
