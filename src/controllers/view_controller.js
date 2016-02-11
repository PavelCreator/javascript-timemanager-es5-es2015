view = {
  renewClockFace: function () {
    document.getElementById('hour').value = data.time.h;
    document.getElementById('min').value = data.time.m;
    document.getElementById('sec').value = data.time.s;
    document.getElementById('title').innerHTML = data.time.h + ':' + data.time.m + ':' + data.time.s;
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
  reset: function () {
    this.stopSound();
    this.reverse.unset();
    this.ending.unset();
  },
  setSoundMode: function () {
    if (data.flag.sound) {
      data.flag.sound = false;
      classFnc.add(document.getElementById('sound-off'), 'hide');
      classFnc.remove(document.getElementById('sound-on'), 'hide');
      classFnc.add(document.getElementById('settings-melody'), 'hide');
      classFnc.remove(document.getElementById('settings-alarm-on'), 'active');
      classFnc.add(document.getElementById('settings-alarm-off'), 'active');
    } else {
      data.flag.sound = true;
      classFnc.remove(document.getElementById('sound-off'), 'hide');
      classFnc.add(document.getElementById('sound-on'), 'hide');
      classFnc.remove(document.getElementById('settings-melody'), 'hide');
      classFnc.add(document.getElementById('settings-alarm-on'), 'active');
      classFnc.remove(document.getElementById('settings-alarm-off'), 'active');
    }
  },
  setFinishMode: function () {
    if (data.flag.finish) {
      data.flag.finish = false;
      classFnc.remove(document.getElementById('finish-on'), 'hide');
      classFnc.add(document.getElementById('finish-off'), 'hide');
      classFnc.add(document.getElementById('settings-end-continue'), 'active');
      classFnc.remove(document.getElementById('settings-end-stop'), 'active');
    } else {
      data.flag.finish = true;
      classFnc.add(document.getElementById('finish-on'), 'hide');
      classFnc.remove(document.getElementById('finish-off'), 'hide');
      classFnc.remove(document.getElementById('settings-end-continue'), 'active');
      classFnc.add(document.getElementById('settings-end-stop'), 'active');
    }
  },
  setMarginTop: function(){
    var body = document.body,
      html = document.documentElement;

    var height = Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight);

    if (height > 600) {
      var marginTop = (height - 600)*0.42;
      document.getElementById('app-wrapper').style.marginTop = marginTop + 'px';
    }
  }
}