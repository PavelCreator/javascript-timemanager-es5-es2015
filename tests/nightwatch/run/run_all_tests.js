var _00_start = require('./../tests/00-start');
var _01_init = require('./../tests/01-init');
var _99_close = require('./../tests/99-close');
module.exports = {
  'Open Browser': function (browser) {
    _00_start['Open Browser'](browser);
  },
  'Init : Timer Mode': function (browser) {
    _01_init['Timer Mode'](browser)
  },
  'Init : Stop Watch Mode': function (browser) {
    _01_init['Stop Watch Mode'](browser)
  },
  'Init : Watch Mode': function (browser) {
    _01_init['Watch Mode'](browser)
  },
  'Close Browser': function (browser) {
    _99_close["Close Browser"](browser);
  },
}