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
  },
  getNumFromKeycode: function (keycode) {
    console.log("keycode =", keycode);
    switch (keycode) {
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
  },
  setTimeFromKey: function (fieldName, num, pos) {
    var posEnd, shortFieldName = fieldName.charAt(0);
    console.log("fieldName =", fieldName);
    console.log("num =", num);
    console.log("pos =", pos);
    switch (pos) {
      case 0:
        switch (num) {
          case 'left':
          case 'blackspace':
            switch (shortFieldName){
                case 'm':
                    document.getElementById('hour').focus();
                    document.getElementById('hour').setSelectionRange(2,2);
                break;

                case 's':
                    document.getElementById('min').focus();
                    document.getElementById('min').setSelectionRange(2,2);
                break;
            }
            return false;
            break;

          case 'right':
            posEnd = 1;
            break;

          case 'delete':
            data.time[shortFieldName] = '0' + data.time[shortFieldName].charAt(1);
            posEnd = 1;
            break;

          default:
            data.time[shortFieldName] = num + data.time[shortFieldName].charAt(1);
            posEnd = 1;
            break;
        }
        break;

      case 1:
        switch (num) {
          case 'left':
            posEnd = 0;
            break;

          case 'right':
            posEnd = 2;
            break;

          case 'delete':
            data.time[shortFieldName] = data.time[shortFieldName].charAt(0) + '0';
            posEnd = 2;
            break;

          case 'blackspace':
            data.time[shortFieldName] = '0' + data.time[shortFieldName].charAt(1);
            posEnd = 0;
            break;

          default:
            data.time[shortFieldName] = data.time[shortFieldName].charAt(0) + num;
            view.renewClockFace();
            switch (shortFieldName){
                case 'h':
                    document.getElementById('min').focus();
                    document.getElementById('min').setSelectionRange(0,0);
                break;

                case 'm':
                    document.getElementById('sec').focus();
                    document.getElementById('sec').setSelectionRange(0,0);
                break;
            }
            return false;
            break;
        }
        break;

      case 2:
        switch (num) {
          case 'left':
            posEnd = 1;
            break;

          case 'right':
          case 'delete':
            switch (shortFieldName){
                case 'h':
                    document.getElementById('min').focus();
                    document.getElementById('min').setSelectionRange(0,0);
                break;

                case 'm':
                    document.getElementById('sec').focus();
                    document.getElementById('sec').setSelectionRange(0,0);
                break;
            }
            return false;
            break;

          case 'blackspace':
            data.time[shortFieldName] = data.time[shortFieldName].charAt(0) + '0';
            posEnd = 1;
            break;

          default:
            return 2;
            break;
        }
        break;
    }
    view.renewClockFace();
    return posEnd;
  }
}