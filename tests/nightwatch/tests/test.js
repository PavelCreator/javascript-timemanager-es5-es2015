var el = require('./../services/elements');
var svc = require('./../services/services');
module.exports = {
  _this: this,
  'Open Browser': function (browser) {
    browser
      .url(el.URL)
      .waitForElementVisible('body', 1000)
      svc.Clean_Local_Storage(browser);
  },
  'Timer Mode : Check Init': function (browser) {
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
      if (key == 'Stop'){
        browser.expect.element(el.Settings.Melody[key]).to.not.be.visible;
      }else{
        browser.expect.element(el.Settings.Melody[key]).to.be.visible;
      }
    }
    /*State and classes*/
    browser.assert.cssClassPresent(el.State.Run_Stop.Run, "active");
    browser.assert.cssClassNotPresent(el.State.Run_Stop.Stop, "active");
  },
  'Stop Watch Mode : Check Init': function (browser) {
    browser.click(el.Settings.Mode.Stop_Watch);
    var _stop_watch_mode_el_presented = [
      el.Buttons,
      el.Fields.Timer,
      el.Settings.Mode,
      el.Settings.Name,
      el.Settings.Mini_Watch
    ];
    var _stop_watch_el_not_presented = [
      el.Settings.Alarm,
      el.Settings.In_The_End,
      el.Fields.Big_Clock,
      el.Settings.Melody
    ];
    /*Presented or not*/
    svc.Counting_Elements_Presented(browser, _stop_watch_mode_el_presented);
    svc.Counting_Elements_Not_Presented(browser, _stop_watch_el_not_presented);

    /*State and classes*/
    browser.assert.cssClassPresent(el.State.Run_Stop.Run, "active");
    browser.assert.cssClassNotPresent(el.State.Run_Stop.Stop, "active");
  },
  'Close Browser': function (browser) {
    browser
      .end();
  }
};
