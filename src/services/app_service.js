timerSvc = {
  fromTimeToSec: function () {
    if (data.time.s > 59) {
      data.time.s = 60;
    }
    if (data.time.m > 59) {
      data.time.m = 59;
      data.time.s = 60;
    }
    if (data.time.h > 23) {
      data.time.h = 23;
      data.time.m = 59;
      data.time.s = 60;
    }
    data.timeInSec =
      parseFloat(data.time.h) * 3600 +
      parseFloat(data.time.m) * 60 +
      parseFloat(data.time.s);
  },
  fromSecToTime: function () {
    var timeInSec = data.timeInSec;
    //HOUR
    if (timeInSec >= 90000) {
      data.time.h = '24';
    } else {
      if (timeInSec >= 36000) {
        data.time.h = '' + Math.floor(timeInSec / 3600);
      } else {
        if (timeInSec >= 3600) {
          data.time.h = '0' + Math.floor(timeInSec / 3600);
        } else {
          data.time.h = '00';
        }
      }
    }
    //MIN
    var min = Math.floor((timeInSec - parseFloat(data.time.h) * 3600) / 60);
    if (min < 10) {
      data.time.m = '0' + min.toString();
    } else {
      data.time.m = min.toString();
    }
    //SEC
    var sec = Math.floor((timeInSec - parseFloat(data.time.h) * 3600)) - min * 60;
    if (sec < 10) {
      data.time.s = '0' + sec.toString();
    } else {
      data.time.s = sec.toString();
    }
  },
  getValuesFromHTML: function () {
    this.getTimeParameterFromHTML('h', 'hour');
    this.getTimeParameterFromHTML('m', 'min');
    this.getTimeParameterFromHTML('s', 'sec');
  },
  getTimeParameterFromHTML: function (hms, elId) {
    switch (data.time[hms].length) {
      case 2:
        data.time[hms] = document.getElementById(elId).value;
        break;
      case 1:
        data.time[hms] = '0' + document.getElementById(elId).value;
        break;
      default:
        data.time[hms] = '00';
        break;
    }
  }
}