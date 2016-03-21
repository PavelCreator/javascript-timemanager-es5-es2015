var el = require('./../services/elements');
var svc = require('./../services/services');
module.exports = {
  _this: this,
  'Timer Mode': function (browser) {
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
    /*Presented or not*/
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
    browser
      .assert.cssClassPresent(el.State.Run_Stop.Run, "active")
      .assert.cssClassNotPresent(el.State.Run_Stop.Stop, "active")

      .assert.cssClassPresent(el.Settings.Mode.Timer, "active")
      .assert.cssClassNotPresent(el.Settings.Mode.Stop_Watch, "active")
      .assert.cssClassNotPresent(el.Settings.Mode.Watch, "active")
  },
  'Stop Watch Mode': function (browser) {
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

      /*Presented or not*/
      svc.Counting_Elements_Presented(browser, _stop_watch_mode_el_presented);
      svc.Counting_Elements_Not_Presented(browser, _stop_watch_mode_el_not_presented);
      browser.expect.element(el.State.Big_Timer_Wrapper).to.be.visible;
      browser.expect.element(el.State.Big_Watch_Wrapper).to.not.be.visible;

      /*Reverse CSS check*/
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
    svc.RefreshPage(browser);
    checkThisMode();
  },
  'Watch Mode': function (browser) {
    browser.click(el.Settings.Mode.Watch);
    var _watch_mode_el_presented = [
      el.Buttons,
      el.Fields.Big_Clock,
      el.Settings.Mode
    ];
    var _watch_mode_el_not_presented = [
      el.Fields.Timer,
      el.Settings.Name,
      el.Settings.Mini_Watch,
      el.Settings.Alarm,
      el.Settings.In_The_End,
      el.Settings.Melody
    ];

    /*Presented or not*/
    svc.Counting_Elements_Presented(browser, _watch_mode_el_presented);
    svc.Counting_Elements_Not_Presented(browser, _watch_mode_el_not_presented);
    browser.expect.element(el.State.Big_Timer_Wrapper).to.not.be.visible;
    browser.expect.element(el.State.Big_Watch_Wrapper).to.be.visible;

    /*Disabled buttons check*/
    for (var key in el.Buttons) {
      browser.assert.attributeEquals(el.Buttons[key], "disabled", "true");
    }

    browser
      .assert.cssClassNotPresent(el.Settings.Mode.Timer, "active")
      .assert.cssClassNotPresent(el.Settings.Mode.Stop_Watch, "active")
      .assert.cssClassPresent(el.Settings.Mode.Watch, "active")
  }
};
