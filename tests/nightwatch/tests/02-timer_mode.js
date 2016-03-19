var el = require('./../services/elements');
var svc = require('./../services/services');
module.exports = {
  _this: this,
  before: function (browser) {
    browser.click(el.Settings.Mode.Timer);
  },
  'Timer Mode : Time Buttons': function (browser) {
    browser.click(el.Buttons.Reset);
    for (var key in el.Fields.Timer) {
      browser.assert.value(el.Fields.Timer[key], "00");
    }

    browser.click(el.Buttons.Min_1);
    browser.assert.value(el.Fields.Timer.Hour, "00");
    browser.assert.value(el.Fields.Timer.Min, "01");
    browser.assert.value(el.Fields.Timer.Sec, "00");

    browser.click(el.Buttons.Min_2);
    browser.assert.value(el.Fields.Timer.Hour, "00");
    browser.assert.value(el.Fields.Timer.Min, "02");
    browser.assert.value(el.Fields.Timer.Sec, "00");
  }
};
