var el = require('./../services/elements');
var svc = require('./../services/services');
module.exports = {
  _this: this,
  "Close Browser": function (browser) {
    browser
      .end();
  }
};
