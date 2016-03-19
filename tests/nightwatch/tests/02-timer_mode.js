var el = require('./../services/elements');
var svc = require('./../services/services');
module.exports = {
  _this: this,
  before: function (browser) {
    browser.click(el.Settings.Mode.Timer);
  },
  'Time Buttons Click': function (browser) {
    /*Min check*/
    var min_arr = ['1', '2', '5', '10', '15', '20', '30', '45']
    for (var i = 0; i < min_arr.length; i++) {
      browser.click(el.Buttons['Min_' + min_arr[i]]);
      browser.assert.value(el.Fields.Timer.Hour, "00");
      if (min_arr[i].length == 1) {
        browser.assert.value(el.Fields.Timer.Min, "0" + min_arr[i]);
      } else {
        browser.assert.value(el.Fields.Timer.Min, min_arr[i]);
      }
      browser.assert.value(el.Fields.Timer.Sec, "00");
    }

    /*Hour*/
    var hour_arr = ['1', '2']
    for (var i = 0; i < hour_arr.length; i++) {
      browser.click(el.Buttons['Hour_' + hour_arr[i]]);
      browser.assert.value(el.Fields.Timer.Hour, "0" + hour_arr[i]);
      browser.assert.value(el.Fields.Timer.Min, "00");
      browser.assert.value(el.Fields.Timer.Sec, "00");
    }

    /*Reset check*/
    browser.click(el.Buttons.Reset);
    for (var key in el.Fields.Timer) {
      browser.assert.value(el.Fields.Timer[key], "00");
    }
  },
  'Timer Counting Down': function (browser) {
    /*1 min*/
    browser.click(el.Buttons.Min_1);
    browser.assert.value(el.Fields.Timer.Min, "01");
    browser.assert.value(el.Fields.Timer.Sec, "00");
    browser.assert.cssClassPresent(el.State.Run_Stop.Run, "active");
    browser.assert.cssClassNotPresent(el.State.Run_Stop.Stop, "active");
    browser.assert.title("01:00");

    browser.click(el.Buttons.Run_Stop);
    browser.pause(1000);
    browser.assert.value(el.Fields.Timer.Min, "00");
    browser.assert.value(el.Fields.Timer.Sec, "59");
    browser.assert.cssClassNotPresent(el.State.Run_Stop.Run, "active");
    browser.assert.cssClassPresent(el.State.Run_Stop.Stop, "active");
    browser.assert.title("00:59");

    browser.pause(1000);
    browser.assert.value(el.Fields.Timer.Sec, "58");
    browser.assert.title("00:58");

    /*1 hour*/
    browser.click(el.Buttons.Hour_1);
    browser.assert.value(el.Fields.Timer.Hour, "01");
    browser.assert.value(el.Fields.Timer.Min, "00");
    browser.assert.value(el.Fields.Timer.Sec, "00");
    browser.assert.title("01:00:00");

    browser.click(el.Buttons.Run_Stop);
    browser.pause(1000);
    browser.assert.value(el.Fields.Timer.Hour, "00");
    browser.assert.value(el.Fields.Timer.Min, "59");
    browser.assert.value(el.Fields.Timer.Sec, "59");
    browser.assert.cssClassNotPresent(el.State.Run_Stop.Run, "active");
    browser.assert.cssClassPresent(el.State.Run_Stop.Stop, "active");
    browser.assert.title("59:59");

    browser.pause(1000);
    browser.assert.value(el.Fields.Timer.Hour, "00");
    browser.assert.value(el.Fields.Timer.Min, "59");
    browser.assert.value(el.Fields.Timer.Sec, "58");
    browser.assert.title("59:58");

    browser.click(el.Buttons.Run_Stop);
    browser.pause(1000);
    browser.assert.value(el.Fields.Timer.Hour, "00");
    browser.assert.value(el.Fields.Timer.Min, "59");
    browser.assert.value(el.Fields.Timer.Sec, "58");
    browser.assert.title("59:58");
  },
  'Enter value from keyboard': function (browser) {
    browser.click(el.Fields.Timer.Hour);
    browser.keys([
      browser.Keys.LEFT_ARROW,
      browser.Keys.LEFT_ARROW,
      '1','2','3','4','5','6'
    ])
    browser.assert.value(el.Fields.Timer.Hour, "12");
    browser.assert.value(el.Fields.Timer.Min, "34");
    browser.assert.value(el.Fields.Timer.Sec, "56");
    browser.assert.title("12:34:56");

    browser.click(el.Buttons.Run_Stop);
    browser.pause(1000);
    browser.assert.value(el.Fields.Timer.Hour, "12");
    browser.assert.value(el.Fields.Timer.Min, "34");
    browser.assert.value(el.Fields.Timer.Sec, "55");
    browser.assert.title("12:34:55");

  },
};
