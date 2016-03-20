var el = require('./../services/elements');
var svc = require('./../services/services');
module.exports = {
  _this: this,
  'Time Buttons Click': function (browser) {
    browser.click(el.Settings.Mode.Timer);
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
    browser
      .click(el.Settings.In_The_End.Continue)
      .click(el.Fields.Timer.Hour)
      .keys([
        browser.Keys.LEFT_ARROW,
        browser.Keys.LEFT_ARROW,
        '1', '2', '3', '4', '5', '6'
      ])
      .assert.value(el.Fields.Timer.Hour, "12")
      .assert.value(el.Fields.Timer.Min, "34")
      .assert.value(el.Fields.Timer.Sec, "56")
      .assert.title("12:34:56")

      .keys(browser.Keys.ENTER)
      /*Start*/
      .pause(1000)
      .assert.title("12:34:55")

      .keys(browser.Keys.SPACE)
      /*Stop*/
      .pause(1000)
      .assert.title("12:34:55")

      .click(el.Fields.Timer.Sec)
      .keys([
        browser.Keys.LEFT_ARROW,
        browser.Keys.LEFT_ARROW,
        browser.Keys.DELETE,
        browser.Keys.DELETE,
        browser.Keys.BACK_SPACE,
        browser.Keys.BACK_SPACE,
        browser.Keys.BACK_SPACE,
        browser.Keys.BACK_SPACE,
        browser.Keys.BACK_SPACE,
        browser.Keys.BACK_SPACE,
        browser.Keys.BACK_SPACE,
        browser.Keys.BACK_SPACE
      ])
      .assert.value(el.Fields.Timer.Hour, "00")
      .assert.value(el.Fields.Timer.Min, "00")
      .assert.value(el.Fields.Timer.Sec, "00")
      .assert.title("00:00");
  },
  'Enter bad value from keyboard': function (browser) {
    browser
      .click(el.Settings.In_The_End.Continue)
      .click(el.Buttons.Run_Stop)
      .click(el.Fields.Timer.Hour)
      .keys([
        browser.Keys.LEFT_ARROW,
        browser.Keys.LEFT_ARROW,
        '9', '9', '9', '9', '9', '9'
      ])
      .assert.value(el.Fields.Timer.Hour, "99")
      .assert.value(el.Fields.Timer.Min, "59")
      .assert.value(el.Fields.Timer.Sec, "59")
      .assert.title("99:59:59")
      .assert.cssClassPresent(el.State.Big_Timer_Wrapper, "ending")
      .pause(1000)
      .assert.cssClassNotPresent(el.State.Big_Timer_Wrapper, "ending")
  },
  'Ending and Reverse': function (browser) {
    browser.click(el.Buttons.Reset);
    browser.click(el.Settings.In_The_End.Continue);

    browser.click(el.Fields.Timer.Sec);
    browser.keys([
      browser.Keys.LEFT_ARROW,
      '7',
    ])
    browser.assert.title("00:07");

    browser.keys(browser.Keys.SPACE);
    browser.pause(1000);
    browser.assert.title("00:06");
    browser.assert.cssClassNotPresent(el.State.Big_Timer_Wrapper, "ending");
    browser.assert.cssClassNotPresent(el.State.Big_Timer_Wrapper, "reverse");

    browser.pause(1000);
    browser.assert.title("00:05");
    browser.assert.cssClassPresent(el.State.Big_Timer_Wrapper, "ending");
    browser.assert.cssClassNotPresent(el.State.Big_Timer_Wrapper, "reverse");

    browser.click(el.Fields.Timer.Sec);
    browser.keys([
      browser.Keys.LEFT_ARROW,
      '1',
    ])

    browser.keys(browser.Keys.SPACE);
    browser.pause(1000);
    browser.assert.title("00:00");
    browser.assert.cssClassPresent(el.State.Big_Timer_Wrapper, "ending");
    browser.assert.cssClassNotPresent(el.State.Big_Timer_Wrapper, "reverse");

    browser.pause(1000);
    browser.assert.title("00:01");
    browser.assert.cssClassNotPresent(el.State.Big_Timer_Wrapper, "ending");
    browser.assert.cssClassPresent(el.State.Big_Timer_Wrapper, "reverse");

    browser.click(el.Buttons.Reset);
    browser.click(el.Settings.In_The_End.Stop);

    browser.click(el.Fields.Timer.Sec);
    browser.keys([
      browser.Keys.LEFT_ARROW,
      '1',
    ])

    browser.keys(browser.Keys.SPACE);
    browser.pause(1000);
    browser.assert.title("00:00");
    browser.assert.cssClassPresent(el.State.Big_Timer_Wrapper, "ending");
    browser.assert.cssClassNotPresent(el.State.Big_Timer_Wrapper, "reverse");
    browser.assert.cssClassNotPresent(el.State.Run_Stop.Run, "active");
    browser.assert.cssClassPresent(el.State.Run_Stop.Stop, "active");

    browser.pause(1000);
    browser.assert.title("00:00");
    browser.assert.cssClassPresent(el.State.Big_Timer_Wrapper, "ending");
    browser.assert.cssClassNotPresent(el.State.Big_Timer_Wrapper, "reverse");
    browser.assert.cssClassPresent(el.State.Run_Stop.Run, "active");
    browser.assert.cssClassNotPresent(el.State.Run_Stop.Stop, "active");

    browser.click(el.Buttons.Reset);
    browser.keys(browser.Keys.SPACE);
    browser.pause(500);
    browser.assert.cssClassPresent(el.Settings.In_The_End.Continue, "warning");
    browser.pause(1000);
    browser.assert.cssClassNotPresent(el.Settings.In_The_End.Continue, "warning");
  },
  'Name': function (browser) {
    browser
      .click(el.Buttons.Reset)
      .assert.title("00:00")

      .setValue(el.Settings.Name.Field, 'JS')
      .assert.title("00:00 JS")

      .click(el.Buttons.Min_1)
      .assert.title("01:00 JS")

      .click(el.Settings.Name.Field)
      .keys([
        browser.Keys.BACK_SPACE,
        browser.Keys.BACK_SPACE
      ])
      .assert.title("01:00");
  },
};
