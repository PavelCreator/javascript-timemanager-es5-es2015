var _start = require('./../tests/01-start');
var _timer_mode = require('./../tests/02-timer_mode');
var _stop_watch_mode = require('./../tests/03-stop_watch_mode');
var _watch_mode = require('./../tests/04-watch_mode');
var _close = require('./../tests/05-close');
module.exports = {
  'Open Browser': function (browser) {
    _start['Open Browser'](browser);
  },
  'Timer Mode: Init': function (browser) {
    _timer_mode['Init'](browser)
  },
  'Timer Mode: Time Buttons Click': function (browser){
    _timer_mode['Time Buttons Click'](browser)
  },
  'Timer Mode: Enter value from keyboard': function (browser){
    _timer_mode['Enter value from keyboard'](browser)
  },
  'Timer Mode: Enter bad value from keyboard (99:99:99)': function (browser){
    _timer_mode['Enter bad value from keyboard'](browser)
  },
  'Timer Mode: Timer Counting Down': function (browser){
    _timer_mode['Timer Counting Down'](browser)
  },
  'Timer Mode: Ending and Reverse': function (browser){
    _timer_mode['Ending and Reverse'](browser)
  },
  'Timer Mode: Name': function (browser){
    _timer_mode['Name'](browser)
  },
  'Timer Mode: Alarm': function (browser){
    _timer_mode['Alarm'](browser)
  },
  'Timer Mode: Melody': function (browser){
    _timer_mode['Melody'](browser)
  },
  'Stop Watch Mode: Init': function (browser) {
    _stop_watch_mode['Init'](browser)
  },
  'Stop Watch Mode: Timer Counting Up': function (browser) {
    _stop_watch_mode['Timer Counting Up'](browser)
  },
  'Watch Mode: Init': function (browser) {
    _watch_mode['Init'](browser)
  },
  'Close Browser': function (browser) {
    _close["Close Browser"](browser);
  },
}