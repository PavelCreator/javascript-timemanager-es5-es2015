var el = require('./../services/elements');
var svc = require('./../services/services');

module.exports = {
  _this: this,
  'Init': function (browser) {
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

    /*Visible and hidden elements*/
    svc.Log("*Visible and hidden elements");
    svc.Counting_Elements_Presented(browser, _watch_mode_el_presented);
    svc.Counting_Elements_Not_Presented(browser, _watch_mode_el_not_presented);
    browser.expect.element(el.State.Big_Timer_Wrapper).to.not.be.visible;
    browser.expect.element(el.State.Big_Watch_Wrapper).to.be.visible;

    /*Disabled buttons check*/
    svc.Log("Disabled buttons check");
    for (var key in el.Buttons) {
      browser.assert.attributeEquals(el.Buttons[key], "disabled", "true");
    }

    /*State and classes*/
    svc.Log("State and classes");
    browser
      .assert.cssClassNotPresent(el.Settings.Mode.Timer, "active")
      .assert.cssClassNotPresent(el.Settings.Mode.Stop_Watch, "active")
      .assert.cssClassPresent(el.Settings.Mode.Watch, "active")
  }
};
