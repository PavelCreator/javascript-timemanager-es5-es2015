module.exports = {
  _browser: null,
  Clean_Local_Storage: function (browser) {
    browser.execute('if (window.localStorage) { window.localStorage.clear(); return true; }', function (result) {
      browser.assert.equal('1', '1');
    })
  },
  Counting_Elements_Presented: function (browser, elements) {
    for (var i = 0; i < elements.length; i++) {
      for (var key in elements[i]) {
        browser.expect.element(elements[i][key]).to.be.visible;
      }
    }
  },
  Counting_Elements_Not_Presented: function (browser, elements) {
    for (var i = 0; i < elements.length; i++) {
      for (var key in elements[i]) {
        browser.expect.element(elements[i][key]).to.not.be.visible;
      }
    }
  },
  RefreshPage: function (browser) {
    browser
      .refresh()
      .waitForElementVisible('body', 1000);
  },
  Log: function (text) {
    this._browser.session(function (result) {
      console.log("\033[1m\033[5m\033[36m *** " + text + ' ***');
    });
  },
  GetBrowser: function (browser){
    this._browser = browser;
  }
};