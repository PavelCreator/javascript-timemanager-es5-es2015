view = {
  startOrStop: function(startOrStop){
    if (startOrStop === 'start') {
      classFnc.remove(document.getElementById('run'), 'active');
      classFnc.add(document.getElementById('stop'), 'active');
    } else {
      classFnc.remove(document.getElementById('stop'), 'active');
      classFnc.add(document.getElementById('run'), 'active');
    }
  },
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
    data.audio.volume = data.audioSettings.volume;
    data.audio.src = '/timer/audio/' + data.audioSettings.url;
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
      localStorage.setItem("sound-play", "0");
      classFnc.add(document.getElementById('sound-off'), 'hide');
      classFnc.remove(document.getElementById('sound-on'), 'hide');
      classFnc.add(document.getElementById('settings-melody'), 'hide');
      classFnc.remove(document.getElementById('settings-alarm-on'), 'active');
      classFnc.add(document.getElementById('settings-alarm-off'), 'active');
    } else {
      data.flag.sound = true;
      localStorage.setItem("sound-play", "1");
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
      localStorage.setItem("finish", "0");
      classFnc.remove(document.getElementById('finish-on'), 'hide');
      classFnc.add(document.getElementById('finish-off'), 'hide');
      classFnc.add(document.getElementById('settings-end-continue'), 'active');
      classFnc.remove(document.getElementById('settings-end-stop'), 'active');
    } else {
      data.flag.finish = true;
      localStorage.setItem("finish", "1");
      classFnc.add(document.getElementById('finish-on'), 'hide');
      classFnc.remove(document.getElementById('finish-off'), 'hide');
      classFnc.remove(document.getElementById('settings-end-continue'), 'active');
      classFnc.add(document.getElementById('settings-end-stop'), 'active');
    }
  },
  setMarginTop: function () {
    var body = document.body,
      html = document.documentElement;

    var height = Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight);

    if (height > 600) {
      var marginTop = (height - 600) * 0.42;
      document.getElementById('app-wrapper').style.marginTop = marginTop + 'px';
    }
  },
  setMelodyPlay: function (melodyPlay) {
    if (melodyPlay) {
      classFnc.remove(document.getElementById('settings-melody-stop'), 'hide');
      classFnc.add(document.getElementById('settings-melody-play'), 'hide');
      this.playSound();
      data.audio.onended = function () {
        view.setMelodyPlay(false);
      };
    } else {
      classFnc.remove(document.getElementById('settings-melody-play'), 'hide');
      classFnc.add(document.getElementById('settings-melody-stop'), 'hide');
      this.stopSound();
    }
  },
  buildMelodiesList: function () {
    var melodiesList = '',
      volumeList = '';

    var defaultMelody = localStorage.getItem("sound-melody")
      ? localStorage.getItem("sound-melody")
      : 0;
    for (var i = 0; i < data.audios.length; i++) {
      melodiesList += (i == defaultMelody)
        ? '<option value="' + i + '" selected>' + data.audios[i].name + '</option>'
        : '<option value="' + i + '">' + data.audios[i].name + '</option>';
    }

    var defaultVolume = localStorage.getItem("sound-volume")
      ? localStorage.getItem("sound-volume") * 10
      : 7;
    for (var i = 10; i > 0; i--) {
      volumeList += (i == defaultVolume)
        ? '<option value="' + i / 10 + '" selected>' + i * 10 + '%</option>'
        : '<option value="' + i / 10 + '">' + i * 10 + '%</option>';
    }

    document.getElementById('melodies-list').innerHTML = melodiesList;
    document.getElementById('volume-list').innerHTML = volumeList;
  },
  setSettingsFromStorage: function () {
    var
      soundMelodyId = localStorage.getItem("sound-melody"),
      soundVolume = localStorage.getItem("sound-volume"),
      finish = localStorage.getItem("finish"),
      soundPlay = localStorage.getItem("sound-play");

    if (soundMelodyId) {
      document.getElementById('settings-melody-name').innerHTML = data.audios[soundMelodyId].name;
      data.audioSettings.url = data.audios[soundMelodyId].url;
    }
    if (soundVolume) {
      data.audioSettings.volume = soundVolume;
    }
    if (finish === '1') {
      this.setFinishMode();
    }
    if (soundPlay === '0'){
      this.setSoundMode();
    }
  }
}