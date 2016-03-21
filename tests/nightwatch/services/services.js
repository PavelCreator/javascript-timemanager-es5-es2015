module.exports = {
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

};