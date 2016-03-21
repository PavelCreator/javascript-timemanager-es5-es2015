var el = require('./../services/elements');
var svc = require('./../services/services');

module.exports = {
  _this: this,
  'Init': function (browser) {
    var _timer_mode_el_presented = [
      el.Buttons,
      el.Fields.Timer,
      el.Settings.Mode,
      el.Settings.Alarm,
      el.Settings.In_The_End,
      el.Settings.Name,
      el.Settings.Mini_Watch
    ];
    var _timer_mode_el_not_presented = [
      el.Fields.Big_Clock
    ];

    /*Visible and hidden elements*/
    svc.Log("*Visible and hidden elements");
    svc.Counting_Elements_Presented(browser, _timer_mode_el_presented);
    svc.Counting_Elements_Not_Presented(browser, _timer_mode_el_not_presented);
    for (var key in el.Settings.Melody) {
      if (key == 'Stop') {
        browser.expect.element(el.Settings.Melody[key]).to.not.be.visible;
      } else {
        browser.expect.element(el.Settings.Melody[key]).to.be.visible;
      }
    }
    browser.expect.element(el.State.Big_Timer_Wrapper).to.be.visible;
    browser.expect.element(el.State.Big_Watch_Wrapper).to.not.be.visible;

    /*State and classes*/
    svc.Log("State and classes");
    browser
      .assert.cssClassPresent(el.State.Run_Stop.Run, "active")
      .assert.cssClassNotPresent(el.State.Run_Stop.Stop, "active")
      .assert.cssClassPresent(el.Settings.Mode.Timer, "active")
      .assert.cssClassNotPresent(el.Settings.Mode.Stop_Watch, "active")
      .assert.cssClassNotPresent(el.Settings.Mode.Watch, "active");

    /*Title 00:00 check*/
    svc.Log("Title check");
    browser.assert.title("00:00");
  },
  'Time Buttons Click': function (browser) {
    browser.click(el.Settings.Mode.Timer);
    /*Min buttons click and check*/
    svc.Log("Min buttons click");
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

    /*Hour buttons click and check*/
    svc.Log("Hour buttons click");
    var hour_arr = ['1', '2']
    for (var i = 0; i < hour_arr.length; i++) {
      browser.click(el.Buttons['Hour_' + hour_arr[i]]);
      browser.assert.value(el.Fields.Timer.Hour, "0" + hour_arr[i]);
      browser.assert.value(el.Fields.Timer.Min, "00");
      browser.assert.value(el.Fields.Timer.Sec, "00");
    }

    /*Reset button click and check*/
    svc.Log("Reset button click and check");
    browser.click(el.Buttons.Reset);
    for (var key in el.Fields.Timer) {
      browser.assert.value(el.Fields.Timer[key], "00");
    }
  },
  'Timer Counting Down': function (browser) {
    /*1 min*/
    svc.Log("1 min");
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
    svc.Log("1 hour");
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
    browser.click(el.Settings.In_The_End.Continue);
    /*Focus in hour input*/
    svc.Log("Focus in hour input");
    browser.click(el.Fields.Timer.Hour);

    /*Enter values 123456*/
    svc.Log("Enter values 123456");
    browser.keys([
        browser.Keys.LEFT_ARROW,
        browser.Keys.LEFT_ARROW,
        '1', '2', '3', '4', '5', '6'
      ]);
    browser.assert.value(el.Fields.Timer.Hour, "12")
      .assert.value(el.Fields.Timer.Min, "34")
      .assert.value(el.Fields.Timer.Sec, "56")
      .assert.title("12:34:56");

    /*Click from keyboard ENTER (start) and ...*/
    svc.Log("Click from keyboard ENTER (start) and ...");
    browser.keys(browser.Keys.ENTER)
      .pause(1000)
      .assert.title("12:34:55");

    /*... SPACE (stop)*/
    svc.Log("... SPACE (stop)");
    browser.keys(browser.Keys.SPACE)
      .pause(1000)
      .assert.title("12:34:55");

    /*LocalStorage - time*/
    svc.Log("LocalStorage - time");
    svc.RefreshPage(browser);
    browser.assert.value(el.Fields.Timer.Hour, "12")
      .assert.value(el.Fields.Timer.Min, "34")
      .assert.value(el.Fields.Timer.Sec, "55")
      .assert.title("12:34:55")
      .assert.cssClassNotPresent(el.State.Big_Timer_Wrapper, "reverse");

    /*Delete value from fields chain using DELETE and BACKSPACE buttons*/
    svc.Log("Delete value from fields chain using DELETE and BACKSPACE buttons");
    browser
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
    /*Enter in field chain from keyboard 999999 (99:99:99) ...*/
    svc.Log("Enter in field chain 999999");
    browser
      .click(el.Settings.In_The_End.Continue)
      .click(el.Buttons.Run_Stop)
      .click(el.Fields.Timer.Hour)
      .keys([
        browser.Keys.LEFT_ARROW,
        browser.Keys.LEFT_ARROW,
        '9', '9', '9', '9', '9', '9'
      ]);

    /*... and get 99:59:59*/
    svc.Log("... and get 99:59:59");
    browser
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

    /*Check In_The_End.Continue mode*/
    svc.Log("Check In_The_End.Continue mode");
    browser.click(el.Settings.In_The_End.Continue);
    browser.assert.cssClassPresent(el.Settings.In_The_End.Continue, "active");
    browser.assert.cssClassNotPresent(el.Settings.In_The_End.Stop, "active");

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
    /*From 5 to 0 seconds fields must be red color*/
    svc.Log("From 5 to 0 seconds fields must be red color");
    browser.assert.title("00:05");
    browser.assert.cssClassPresent(el.State.Big_Timer_Wrapper, "ending");
    browser.assert.cssClassNotPresent(el.State.Big_Timer_Wrapper, "reverse");

    browser.click(el.Fields.Timer.Sec);
    browser.keys([
      browser.Keys.LEFT_ARROW,
      '1',
    ])
    browser.keys(browser.Keys.SPACE);

    browser.expect.element(el.Settings.Melody.Play).to.be.visible;
    browser.expect.element(el.Settings.Melody.Stop).to.not.be.visible;
    browser.pause(1000);

    /*Play melody*/
    svc.Log("Play melody");
    browser.assert.title("00:00");
    browser.expect.element(el.Settings.Melody.Play).to.not.be.visible;
    browser.expect.element(el.Settings.Melody.Stop).to.be.visible;

    browser.assert.cssClassPresent(el.State.Big_Timer_Wrapper, "ending");
    browser.assert.cssClassNotPresent(el.State.Big_Timer_Wrapper, "reverse");

    /*Reverse mode on*/
    svc.Log("Reverse mode on");
    browser.pause(1000);
    browser.assert.title("00:01");
    browser.assert.cssClassNotPresent(el.State.Big_Timer_Wrapper, "ending");
    browser.assert.cssClassPresent(el.State.Big_Timer_Wrapper, "reverse");

    /*LocalStorage - reverse*/
    svc.Log("LocalStorage - reverse");
    svc.RefreshPage(browser);
    browser
      .assert.value(el.Fields.Timer.Hour, "00")
      .assert.value(el.Fields.Timer.Min, "00")
      .assert.value(el.Fields.Timer.Sec, "01")
      .assert.title("00:01")
      .assert.cssClassPresent(el.State.Big_Timer_Wrapper, "reverse");

    /*Run_Stop doesn't reset reverse mode*/
    svc.Log('Run_Stop doesn\'t reset reverse mode');
    browser.click(el.Buttons.Run_Stop);
    browser.pause(1000);
    browser
      .assert.title("00:02")
      .assert.cssClassPresent(el.State.Big_Timer_Wrapper, "reverse");

    /*Stop timer on focus in time fields*/
    svc.Log('Stop timer on focus in time fields');
    browser.click(el.Fields.Timer.Sec);
    browser.pause(1000).assert.title("00:02");

    /*Field navigate doesn't reset reverse mode*/
    svc.Log('Field navigate doesn\'t reset reverse mode');
    browser.keys([
      browser.Keys.LEFT_ARROW,
      '8',
    ])
    /*SPACE and ENTER doesn't reset reverse mode*/
    svc.Log('SPACE and ENTER doesn\'t reset reverse mode');
    browser.keys(browser.Keys.SPACE);
    browser.pause(1000);
    browser
      .assert.title("00:09")
      .assert.cssClassPresent(el.State.Big_Timer_Wrapper, "reverse");

    /*Time buttons reset reverse mode*/
    svc.Log('Time buttons reset reverse mode');
    browser.click(el.Buttons.Min_1);
    browser
      .assert.title("01:00")
      .assert.cssClassNotPresent(el.State.Big_Timer_Wrapper, "reverse");

    /*Set reverse mode again for next step*/
    svc.Log('Set reverse mode again for next step');
    browser.click(el.Buttons.Reset);
    browser.keys(browser.Keys.SPACE);
    browser.pause(1000);
    browser
      .assert.title("00:01")
      .assert.cssClassPresent(el.State.Big_Timer_Wrapper, "reverse");

    /*Settings.In_The_End.Stop reset reverse mode*/
    svc.Log('Settings.In_The_End.Stop reset reverse mode');
    browser.click(el.Settings.In_The_End.Stop);
    browser.assert.cssClassNotPresent(el.Settings.In_The_End.Continue, "active");
    browser.assert.cssClassPresent(el.Settings.In_The_End.Stop, "active");

    /*LocalStorage - finish*/
    svc.Log('LocalStorage - finish');
    svc.RefreshPage(browser);
    browser.assert.cssClassNotPresent(el.Settings.In_The_End.Continue, "active");
    browser.assert.cssClassPresent(el.Settings.In_The_End.Stop, "active");

    /*Check In_The_End.Stop mode, reverse not work*/
    svc.Log('Check In_The_End.Stop mode, reverse not work');
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

    /*Stop timer in end*/
    svc.Log('Stop timer in end');
    browser.pause(1000);
    browser.assert.title("00:00");
    browser.assert.cssClassPresent(el.State.Big_Timer_Wrapper, "ending");
    browser.assert.cssClassNotPresent(el.State.Big_Timer_Wrapper, "reverse");
    browser.assert.cssClassPresent(el.State.Run_Stop.Run, "active");
    browser.assert.cssClassNotPresent(el.State.Run_Stop.Stop, "active");

    /*Warning for In_The_End.Continue*/
    svc.Log('Warning for In_The_End.Continue');
    browser.click(el.Buttons.Reset);
    browser.keys(browser.Keys.SPACE);
    browser.pause(500);
    browser.assert.cssClassPresent(el.Settings.In_The_End.Continue, "warning");
    browser.pause(1000);
    browser.assert.cssClassNotPresent(el.Settings.In_The_End.Continue, "warning");
  },
  'Name': function (browser) {
    /*Setting name, check in title*/
    svc.Log("Setting name, check in title");
    browser
      .click(el.Buttons.Reset)
      .assert.title("00:00")

      .setValue(el.Settings.Name.Field, 'JS')
      .assert.title("00:00 JS")

      .click(el.Buttons.Min_1)
      .assert.title("01:00 JS");

    /*LocalStorage - name*/
    svc.Log('LocalStorage - name');
    svc.RefreshPage(browser);
    browser.assert.title("01:00 JS");
    browser
      .assert.value(el.Settings.Name.Field, 'JS');

    browser
      .click(el.Settings.Name.Field)
      .keys([
        browser.Keys.BACK_SPACE,
        browser.Keys.BACK_SPACE
      ])
      .assert.title("01:00");
  },
  'Alarm': function (browser) {
    /*Disable alarm*/
    svc.Log("Disable alarm");
    browser.expect.element(el.Settings.Melody._wrapper).to.be.visible;
    browser.click(el.Settings.Alarm.Off);
    browser.expect.element(el.Settings.Melody._wrapper).to.not.be.visible;

    /*LocalStorage - sound-play*/
    svc.Log('LocalStorage - sound-play');
    svc.RefreshPage(browser);
    browser.expect.element(el.Settings.Melody._wrapper).to.not.be.visible;
    /*Enable alarm*/
    svc.Log("Enable alarm");
    browser.click(el.Settings.Alarm.On);
  },
  'Melody': function (browser) {
    svc.Log("Set last melody");
    browser.expect.element(el.Settings.Melody.Play).to.be.visible;
    browser.expect.element(el.Settings.Melody.Stop).to.not.be.visible;

    /*Set last melody*/
    svc.Log("Set last melody");
    browser.click(el.Settings.Melody.Change);
    browser.click(el.Settings.Melody.Change + ' option:last-child');
    browser.assert.containsText(el.Settings.Melody.Current_Melody, "Message");

    /*Set 10% volume*/
    svc.Log("Set 10% volume");
    browser.click(el.Settings.Melody.Volume);
    browser.click(el.Settings.Melody.Volume + ' option:last-child');

    /*Melody play*/
    svc.Log("Melody play");
    browser.expect.element(el.Settings.Melody.Play).to.not.be.visible;
    browser.expect.element(el.Settings.Melody.Stop).to.be.visible;

    /*Manually stop melody*/
    svc.Log("Manualy stop melody");
    browser.click(el.Settings.Melody.Stop);
    browser.expect.element(el.Settings.Melody.Play).to.be.visible;
    browser.expect.element(el.Settings.Melody.Stop).to.not.be.visible;

    /*LocalStorage - sound-melody, sound-volume*/
    svc.Log('LocalStorage - sound-melody, sound-volume');
    svc.RefreshPage(browser);
    browser.assert.containsText(el.Settings.Melody.Current_Melody, "Message");
    browser.assert.value(el.Settings.Melody.Change, '10');
    browser.expect.element(el.Settings.Melody.Change + ' option:last-child')
      .to.have.attribute('selected')
      .equals('true');
    browser.assert.value(el.Settings.Melody.Volume, '0.1');
    browser.expect.element(el.Settings.Melody.Volume + ' option:last-child')
      .to.have.attribute('selected')
      .equals('true');
  },
};
