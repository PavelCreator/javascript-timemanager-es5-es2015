class Watch {
  start() {
    let startWatch = () => {
      const d = new Date();
      const h = addZero(d.getHours());
      const m = addZero(d.getMinutes());
      const s = addZero(d.getSeconds());
      const currentTime = `${h}<span>:</span>${m}`;
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
    setInterval(() => {
      startWatch();
    }, 1000);
  }
}
watch = new Watch();