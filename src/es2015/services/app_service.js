class TimerSvc {
  static getTimeParameterFromHTML (hms, elId) {
    switch (data.time[hms].length) {
      case 2:
        data.time[hms] = document.getElementById(elId).value;
        break;
      case 1:
        data.time[hms] = `0${document.getElementById(elId).value}`;
        break;
      default:
        data.time[hms] = `00`;
        break;
    }
  };
  static fromTimeToSec () {
    if (data.time.s > 59) {
      data.time.s = 60;
    }
    if (data.time.m > 59) {
      data.time.m = 59;
      data.time.s = 60;
    }
    /*    if (data.time.h > 23) {
     data.time.h = 23;
     data.time.m = 59;
     data.time.s = 60;
     }*/
    data.timeInSec =
      parseFloat(data.time.h) * 3600 +
      parseFloat(data.time.m) * 60 +
      parseFloat(data.time.s);
  };
  static setTimeLocalStorage () {
    if ((flag.get('reverse') === true) && (flag.get('mode') === 'timer')) {
      localStorage.setItem("reverse", true);
    }else{
      localStorage.setItem("reverse", false);
    }
    localStorage.setItem("time", data.timeInSec);
  };
  static fromSecToTime () {
    const timeInSec = data.timeInSec;
    this.setTimeLocalStorage();
    //HOUR
    /*    if (timeInSec >= 90000) {
     data.time.h = '24';
     } else {*/
    if (timeInSec >= 36000) {
      data.time.h = String(Math.floor(timeInSec / 3600));
    } else {
      if (timeInSec >= 3600) {
        data.time.h = `0${Math.floor(timeInSec / 3600)}`;
      } else {
        data.time.h = `00`;
      }
    }
    /*    }*/
    //MIN
    const min = Math.floor((timeInSec - parseFloat(data.time.h) * 3600) / 60);
    if (min < 10) {
      data.time.m = `0${min}`;
    } else {
      data.time.m = String(min);
    }
    //SEC
    const sec = Math.floor((timeInSec - parseFloat(data.time.h) * 3600)) - min * 60;
    if (sec < 10) {
      data.time.s = `0${sec}`;
    } else {
      data.time.s = String(sec);
    }
  };
  static getValuesFromHTML () {
    this.getTimeParameterFromHTML('h', 'hour');
    this.getTimeParameterFromHTML('m', 'min');
    this.getTimeParameterFromHTML('s', 'sec');
  };
  static getNumFromKeycode (keycode) {
    switch (keycode) {
      case 32:
        document.getElementById('hidden').focus();
        timer.startOrStop();
        return false;
        break;
      case 13:
        document.getElementById('hidden').focus();
        timer.startOrStop();
        return false;
        break;

      case 37:
        return 'left';
        break;

      case 39:
        return 'right';
        break;

      case 8:
        return 'blackspace';
        break;

      case 46:
        return 'delete';

      case 48:
      case 96:
        return 0;
        break;

      case 49:
      case 97:
        return 1;
        break;

      case 50:
      case 98:
        return 2;
        break;

      case 51:
      case 99:
        return 3;
        break;

      case 52:
      case 100:
        return 4;
        break;

      case 53:
      case 101:
        return 5;
        break;

      case 54:
      case 102:
        return 6;
        break;

      case 55:
      case 103:
        return 7;
        break;

      case 56:
      case 104:
        return 8;
        break;

      case 57:
      case 105:
        return 9;
        break;

      default:
        return false;
        break;
    }
  };
}