class Watch {
  start() {
    var startWatch = function () {
      var d = new Date();
      var h = addZero(d.getHours());
      var m = addZero(d.getMinutes());
      var s = addZero(d.getSeconds());
      var currentTime = `${h}<span>:</span>${m}`;
      if (document.getElementById('w-hour').value != h) {
        document.getElementById('w-hour').value = h;
      }
      if (document.getElementById('w-min').value != m) {
        document.getElementById('w-min').value = m;
      }
      if (document.getElementById('w-sec').value != s) {
        document.getElementById('w-sec').value = s;
        if (flag.get('mode') === 'watch') {
          view.renewTitle.watch(h, m, s);
        }
      }
      if (document.getElementById('watch').innerHTML != currentTime) {
        document.getElementById('watch').innerHTML = currentTime;
      }
    }
    startWatch();
    setInterval(function () {
      startWatch();
    }, 1000);
  }
}
watch = new Watch();