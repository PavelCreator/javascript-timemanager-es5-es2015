view = {
  renewClockFace: function () {
    document.getElementById('hour').value = data.time.h;
    document.getElementById('min').value = data.time.m;
    document.getElementById('sec').value = data.time.s;
    document.getElementById('title').innerHTML = data.time.h+':'+data.time.m+':'+data.time.s;
  },
  reverse: {
    set: function () {
      data.flag.reverse = true;
      classFnc.add(document.getElementById('clock-face'), 'reverse');
    },
    unset: function () {
      data.flag.reverse = false;
      classFnc.remove(document.getElementById('clock-face'), 'reverse');
    }
  },
  ending: {
    set: function () {
      classFnc.add(document.getElementById('clock-face'), 'ending');
    },
    unset: function () {
      classFnc.remove(document.getElementById('clock-face'), 'ending');
    }
  },
  playSound: function () {
    data.audio.src = '../../audio/alarm_clock_1.mp3';
    data.audio.autoplay = true;
  },
  stopSound: function () {
    if (!data.audio.ended) {
      data.audio.pause();
    }
  },
  reset: function (){
    this.stopSound();
    this.reverse.unset();
    this.ending.unset();
  }
}