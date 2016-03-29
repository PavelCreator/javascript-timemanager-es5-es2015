class Watch {
  start() {
    let startWatch = function () {
      let d = new Date();
      let h = addZero(d.getHours());
      let m = addZero(d.getMinutes());
      let s = addZero(d.getSeconds());
      let currentTime = `${h}<span>:</span>${m}`;
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