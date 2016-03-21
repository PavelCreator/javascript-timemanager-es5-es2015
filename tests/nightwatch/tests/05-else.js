var el = require('./../services/elements');
var svc = require('./../services/services');

module.exports = {
  _this: this,
  'Modal': function (browser) {
    /*Open modal*/
    svc.Log("Open modal");
    browser.click(el.Modal.Open);
    /*Modal is visible*/
    svc.Log("Modal is visible");
    browser.expect.element(el.Modal._wrapper).to.be.visible;
    /*Close modal*/
    svc.Log("Close modal");
    browser.click(el.Modal.Close);
    /*Modal invisible*/
    svc.Log("Modal invisible");
    browser.expect.element(el.Modal._wrapper).to.not.be.visible;
  },
  'Copy to clipboard': function (browser) {
    /*Set timer mode*/
    svc.Log("Set timer mode");
    browser.click(el.Settings.Mode.Timer);

    /*Click on 'Copy value'*/
    svc.Log("Click on 'Copy value'");
    browser.click('#copyToClipboard');

    /*Focus on the Name field*/
    svc.Log("Focus on the Name field");
    browser.click(el.Settings.Name.Field);
    browser
      .keys(browser.Keys.CONTROL);

    /*Paste via CTRL+V*/
    svc.Log("Paste via CTRL+V");
    browser.keys([
      'v'
    ]);
    browser
      .assert.value(el.Settings.Name.Field, '00:00:00');
  }
};
