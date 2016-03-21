var el = require('./../services/elements');
var svc = require('./../services/services');

module.exports = {
  _this: this,
  'Init': function (browser) {
    function checkThisMode() {
      browser.click(el.Settings.Mode.Stop_Watch);
      var _stop_watch_mode_el_presented = [
        el.Buttons,
        el.Fields.Timer,
        el.Settings.Mode,
        el.Settings.Name,
        el.Settings.Mini_Watch
      ];
      var _stop_watch_mode_el_not_presented = [
        el.Settings.Alarm,
        el.Settings.In_The_End,
        el.Fields.Big_Clock,
        el.Settings.Melody
      ];

      /*Visible and hidden elements*/
      svc.Log("*Visible and hidden elements");
      svc.Counting_Elements_Presented(browser, _stop_watch_mode_el_presented);
      svc.Counting_Elements_Not_Presented(browser, _stop_watch_mode_el_not_presented);
      browser.expect.element(el.State.Big_Timer_Wrapper).to.be.visible;
      browser.expect.element(el.State.Big_Watch_Wrapper).to.not.be.visible;

      /*State and classes*/
      svc.Log("State and classes");
      for (var key in el.Buttons) {
        if (key !== 'Run_Stop') {
          browser.assert.cssClassPresent(el.Buttons[key], "stopwatch");
        }
      }
      browser
        .assert.cssClassPresent(el.State.Big_Timer_Wrapper, "reverse")
        .assert.cssClassNotPresent(el.Settings.Mode.Timer, "active")
        .assert.cssClassPresent(el.Settings.Mode.Stop_Watch, "active")
        .assert.cssClassNotPresent(el.Settings.Mode.Watch, "active")
    }

    checkThisMode();

    /*LocalStorage - mode, firstTime*/
    svc.Log("LocalStorage - mode, firstTime");
    svc.RefreshPage(browser);
    checkThisMode();

    /*Title 00:00 check*/
    svc.Log("Title check");
    browser.assert.title("00:00");
  },
  'Timer Counting Up': function (browser) {
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
    browser.assert.value(el.Fields.Timer.Min, "01");
    browser.assert.value(el.Fields.Timer.Sec, "01");
    browser.assert.cssClassNotPresent(el.State.Run_Stop.Run, "active");
    browser.assert.cssClassPresent(el.State.Run_Stop.Stop, "active");
    browser.assert.title("01:01");

    browser.pause(1000);
    browser.assert.value(el.Fields.Timer.Min, "01");
    browser.assert.value(el.Fields.Timer.Sec, "02");
    browser.assert.title("01:02");

    /*1 hour*/
    svc.Log("1 hour");
    browser.click(el.Buttons.Hour_1);
    browser.assert.value(el.Fields.Timer.Hour, "01");
    browser.assert.value(el.Fields.Timer.Min, "00");
    browser.assert.value(el.Fields.Timer.Sec, "00");
    browser.assert.title("01:00:00");

    browser.click(el.Buttons.Run_Stop);
    browser.pause(1000);
    browser.assert.value(el.Fields.Timer.Hour, "01");
    browser.assert.value(el.Fields.Timer.Min, "00");
    browser.assert.value(el.Fields.Timer.Sec, "01");
    browser.assert.cssClassNotPresent(el.State.Run_Stop.Run, "active");
    browser.assert.cssClassPresent(el.State.Run_Stop.Stop, "active");
    browser.assert.title("01:00:01");

    browser.pause(1000);
    browser.assert.value(el.Fields.Timer.Hour, "01");
    browser.assert.value(el.Fields.Timer.Min, "00");
    browser.assert.value(el.Fields.Timer.Sec, "02");
    browser.assert.title("01:00:02");

    browser.click(el.Buttons.Run_Stop);
    browser.pause(1000);
    browser.assert.value(el.Fields.Timer.Hour, "01");
    browser.assert.value(el.Fields.Timer.Min, "00");
    browser.assert.value(el.Fields.Timer.Sec, "02");
    browser.assert.title("01:00:02");
  }
};
