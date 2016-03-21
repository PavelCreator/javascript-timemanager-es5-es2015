var el = require('./../services/elements');
var svc = require('./../services/services');
module.exports = {
  'Open Browser': function (browser) {
    browser
      .url(el.URL)
      .waitForElementVisible('body', 1000)
/*    svc.Clean_Local_Storage(browser);*/
    browser.click(el.Modal.Close);
  }
}