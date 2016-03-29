class View {
  constructor() {
    this.this = this;
  };

  buildMelodiesList() {
    let melodiesList = '',
      volumeList = '';

    const defaultMelody = localStorage.getItem("sound-melody")
      ? localStorage.getItem("sound-melody")
      : 0;
    for (let i = 0; i < data.audios.length; i++) {
      melodiesList += (i == defaultMelody)
        ? `<option value="${i}" selected>${data.audios[i].name}</option>`
        : `<option value="${i}">${data.audios[i].name}</option>`;
    }

    const defaultVolume = localStorage.getItem("sound-volume")
      ? localStorage.getItem("sound-volume") * 10
      : 7;
    for (let i = 10; i > 0; i--) {
      volumeList += (i == defaultVolume)
        ? `<option value="${i / 10}" selected>${i * 10}%</option>`
        : `<option value="${i / 10}">${i * 10}%</option>`;
    }

    document.getElementById('melodies-list').innerHTML = melodiesList;
    document.getElementById('volume-list').innerHTML = volumeList;
  };

  setSettingsFromStorage() {
    const
      soundMelodyId = localStorage.getItem("sound-melody"),
      soundVolume = localStorage.getItem("sound-volume"),
      finish = localStorage.getItem("finish"),
      soundPlay = localStorage.getItem("sound-play"),
      mode = localStorage.getItem("mode"),
      time = localStorage.getItem("time"),
      reverse = localStorage.getItem("reverse"),
      name = localStorage.getItem("name"),
      firstTime = localStorage.getItem("firstTime");

    if (soundMelodyId) {
      document.getElementById('settings-melody-name').innerHTML = data.audios[soundMelodyId].name;
      data.audioSettings.url = data.audios[soundMelodyId].url;
    }
    if (soundVolume) {
      data.audioSettings.volume = soundVolume;
    }
    if (finish === '1') {
      this.setFinishMode();
    } else {
      flag.set('finish', true);
      this.setFinishMode();
    }
    if (soundPlay === '0') {
      this.setSoundMode();
    } else {
      flag.set('sound', false);
      this.setSoundMode();
    }
    if (mode) {
      timer.changeMode(mode);
      view.changeMode();
    } else {
      timer.changeMode('timer');
      view.changeMode();
    }
    if (time) {
      if (!localStorage.getItem('singleton')) {
        data.timeInSec = time;
        timerSvc.fromSecToTime();
        this.renewClockFace();
      }
    }
    if (reverse === 'true') {
      view.reverse.set();
      view.warning.reset();
    }
    if (name) {
      document.getElementById('timer-name').value = name;
      if (flag.get('mode') !== 'watch') view.renewTitle.timer();
    }
    if (!firstTime) {
      events.modalLogic.openModal();
      localStorage.setItem('firstTime', 'true');
    }
  };

  startOrStop(startOrStop) {
    if (startOrStop === 'start') {
      classFnc.remove(document.getElementById('run'), 'active');
      classFnc.add(document.getElementById('stop'), 'active');
    } else {
      classFnc.remove(document.getElementById('stop'), 'active');
      classFnc.add(document.getElementById('run'), 'active');
    }
  };

  renewClockFace() {
    document.getElementById('hour').value = data.time.h;
    document.getElementById('min').value = data.time.m;
    document.getElementById('sec').value = data.time.s;
    this.renewTitle.timer();
  };

  playSound() {
    data.audio.volume = data.audioSettings.volume;
    data.audio.src = `/timemanager/src/audio/${data.audioSettings.url}`;
    data.audio.autoplay = true;
  };

  stopSound() {
    if (!data.audio.ended) {
      data.audio.pause();
    }
  };

  reset() {
    if (flag.get('mode') === 'timer') {
      this.stopSound();
      this.reverse.unset();
      this.ending.unset();
      classFnc.remove(document.getElementById('set0'), 'stopwatch');
    } else {
      this.stopSound();
      this.reverse.unset();
      this.ending.unset();
    }
  };

  setSoundMode() {
    if (flag.get('sound')) {
      flag.set('sound', false);
      localStorage.setItem("sound-play", "0");
      classFnc.add(document.getElementById('settings-melody'), 'hide');
      classFnc.remove(document.getElementById('settings-alarm-on'), 'active');
      classFnc.add(document.getElementById('settings-alarm-off'), 'active');
    } else {
      flag.set('sound', true);
      localStorage.setItem("sound-play", "1");
      classFnc.remove(document.getElementById('settings-melody'), 'hide');
      classFnc.add(document.getElementById('settings-alarm-on'), 'active');
      classFnc.remove(document.getElementById('settings-alarm-off'), 'active');
    }
  };

  setFinishMode() {
    if (flag.get('finish')) {
      flag.set('finish', false);
      localStorage.setItem("finish", "0");
      classFnc.add(document.getElementById('settings-end-continue'), 'active');
      classFnc.remove(document.getElementById('settings-end-stop'), 'active');
    } else {
      flag.set('finish', true);
      localStorage.setItem("finish", "1");
      classFnc.remove(document.getElementById('settings-end-continue'), 'active');
      classFnc.add(document.getElementById('settings-end-stop'), 'active');
    }
  };

  setMarginTop() {
    const body = document.body,
      html = document.documentElement;

    const height = Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight);

    if (height > 600) {
      let marginTop = (height - 600) * 0.25;
      document.getElementById('app-wrapper').style.marginTop = `${marginTop}px`;
    }
  };

  setMelodyPlay(melodyPlay) {
    if (melodyPlay) {
      classFnc.remove(document.getElementById('settings-melody-stop'), 'hide');
      classFnc.add(document.getElementById('settings-melody-play'), 'hide');
      this.playSound();
      data.audio.onended = () => {
        view.setMelodyPlay(false);
      };
    } else {
      classFnc.remove(document.getElementById('settings-melody-play'), 'hide');
      classFnc.add(document.getElementById('settings-melody-stop'), 'hide');
      this.stopSound();
    }
  };

  setTimeFromKey(fieldName, num, pos) {
    let posEnd;
    const shortFieldName = fieldName.charAt(0);
    switch (pos) {
      case 0:
        switch (num) {
          case 'left':
          case 'blackspace':
            switch (shortFieldName) {
              case 'm':
                document.getElementById('hour').focus();
                document.getElementById('hour').setSelectionRange(2, 2);
                break;

              case 's':
                document.getElementById('min').focus();
                document.getElementById('min').setSelectionRange(2, 2);
                break;
            }
            return false;
            break;

          case 'right':
            posEnd = 1;
            break;

          case 'delete':
            data.time[shortFieldName] = `0${data.time[shortFieldName].charAt(1)}`;
            posEnd = 1;
            break;

          case 6:
          case 7:
          case 8:
          case 9:
            if (shortFieldName !== 'h') {
              data.time[shortFieldName] = `5${data.time[shortFieldName].charAt(1)}`;
              view.ending.set();
              setTimeout(() => {
                view.ending.unset();
              }, 1000);
              posEnd = 1;
            }
            else {
              data.time[shortFieldName] = `${num}${data.time[shortFieldName].charAt(1)}`;
              posEnd = 1;
            }
            break;

          default:
            data.time[shortFieldName] = `${num}${data.time[shortFieldName].charAt(1)}`;
            posEnd = 1;
            break;
        }
        break;

      case 1:
        switch (num) {
          case 'left':
            posEnd = 0;
            break;

          case 'right':
            posEnd = 2;
            break;

          case 'delete':
            data.time[shortFieldName] = `${data.time[shortFieldName].charAt(0)}0`;
            posEnd = 2;
            break;

          case 'blackspace':
            data.time[shortFieldName] = `0${data.time[shortFieldName].charAt(1)}`;
            posEnd = 0;
            break;

          default:
            data.time[shortFieldName] = `${data.time[shortFieldName].charAt(0)}${num}`;
            view.renewClockFace();
            switch (shortFieldName) {
              case 'h':
                document.getElementById('min').focus();
                document.getElementById('min').setSelectionRange(0, 0);
                break;

              case 'm':
                document.getElementById('sec').focus();
                document.getElementById('sec').setSelectionRange(0, 0);
                break;
            }
            return false;
            break;
        }
        break;

      case 2:
        switch (num) {
          case 'left':
            posEnd = 1;
            break;

          case 'right':
          case 'delete':
            switch (shortFieldName) {
              case 'h':
                document.getElementById('min').focus();
                document.getElementById('min').setSelectionRange(0, 0);
                break;

              case 'm':
                document.getElementById('sec').focus();
                document.getElementById('sec').setSelectionRange(0, 0);
                break;
            }
            return false;
            break;

          case 'blackspace':
            data.time[shortFieldName] = `${data.time[shortFieldName].charAt(0)}0`;
            posEnd = 1;
            break;

          default:
            return 2;
            break;
        }
        break;
    }
    view.renewClockFace();
    return posEnd;
  };

  changeMode() {
    switch (flag.get('mode')) {
      case 'timer':
        localStorage.setItem("mode", "timer");
        classFnc.add(document.getElementById('settings-mode-timer'), 'active');
        classFnc.remove(document.getElementById('settings-mode-stopwatch'), 'active');
        classFnc.remove(document.getElementById('settings-mode-watch'), 'active');
        this.modeView.watch(false);
        this.modeView.stopwatch(false);
        this.modeView.timer(true);
        break;

      case 'stopwatch':
        localStorage.setItem("mode", "stopwatch");
        view.reverse.set();
        classFnc.remove(document.getElementById('settings-mode-timer'), 'active');
        classFnc.add(document.getElementById('settings-mode-stopwatch'), 'active');
        classFnc.remove(document.getElementById('settings-mode-watch'), 'active');
        this.modeView.watch(false);
        this.modeView.stopwatch(true);
        this.modeView.timer(false);
        break;

      case 'watch':
        localStorage.setItem("mode", "watch");
        classFnc.remove(document.getElementById('settings-mode-timer'), 'active');
        classFnc.remove(document.getElementById('settings-mode-stopwatch'), 'active');
        classFnc.add(document.getElementById('settings-mode-watch'), 'active');
        this.modeView.watch(true);
        this.modeView.stopwatch(false);
        this.modeView.timer(false);
        break;
    }
  };

  copyToClipboard() {
    let textArea = document.createElement("textarea");
    textArea.value = `${data.time.h}:${data.time.m}:${data.time.s}`;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    document.getElementById('copySuccess').style.opacity = '1';
    classFnc.add(document.getElementById('copyToClipboard'), 'green');
    setTimeout(() => {
      document.getElementById('copySuccess').style.opacity = '0';
      classFnc.remove(document.getElementById('copyToClipboard'), 'green');
    }, 1000);
  };

  onStart() {
    this.renewClockFace();
    this.setMarginTop();
    this.buildMelodiesList();
    this.setSettingsFromStorage();
  };
}
View.prototype.state = {
  timeButtons (state) {
    for (let i = 0; i < data.timeButtonArr.length; i++) {
      switch (state) {
        case 'disable':
          document.getElementById(`set${data.timeButtonArr[i]}`).disabled = true;
          break;

        case 'enable':
          document.getElementById(`set${data.timeButtonArr[i]}`).disabled = false;
          break;
      }
    }
  }
};
View.prototype.modeView = {
  timer (bool) {
    if (bool) {
      classFnc.remove(document.getElementById('settings-alarm-wrapper'), 'hide');
      classFnc.remove(document.getElementById('settings-end-continue-wrapper'), 'hide');
      if (flag.get('sound')) {
        classFnc.remove(document.getElementById('settings-melody'), 'hide');
      }
    } else {
      classFnc.add(document.getElementById('settings-alarm-wrapper'), 'hide');
      classFnc.add(document.getElementById('settings-end-continue-wrapper'), 'hide');
      classFnc.add(document.getElementById('settings-melody'), 'hide');
    }
  },
  stopwatch (bool) {
    for (let i = 0; i <= data.timeButtonArr.length - 1; i++) {
      if (bool) {
        classFnc.add(document.getElementById(`set${data.timeButtonArr[i]}`), 'stopwatch');
      } else {
        classFnc.remove(document.getElementById(`set${data.timeButtonArr[i]}`), 'stopwatch');
      }
    }
  },
  watch (bool) {
    if (bool) {
      classFnc.add(document.getElementById('clock-face'), 'hide');
      classFnc.add(document.getElementById('settings-name-wrapper'), 'hide');
      classFnc.remove(document.getElementById('w-clock-face'), 'hide');
      classFnc.add(document.getElementById('watch-clock-face'), 'transparent');
      document.getElementById('push').disabled = true;
      view.state.timeButtons('disable');
    } else {
      classFnc.remove(document.getElementById('clock-face'), 'hide');
      classFnc.remove(document.getElementById('settings-name-wrapper'), 'hide');
      classFnc.add(document.getElementById('w-clock-face'), 'hide');
      classFnc.remove(document.getElementById('watch-clock-face'), 'transparent');
      document.getElementById('push').disabled = false;
      view.state.timeButtons('enable');
    }
  }
};

View.prototype.renewTitle = {
  timer() {
    if (data.time.h == '00') {
      document.getElementById('title').innerHTML = `${data.time.m}:${data.time.s} ${document.getElementById('timer-name').value}`;
    } else {
      document.getElementById('title').innerHTML = `${data.time.h}:${data.time.m}:${data.time.s} ${document.getElementById('timer-name').value}`;
    }
    if (document.getElementById('timer-name').value !== '') {
      localStorage.setItem('name', document.getElementById('timer-name').value)
    } else {
      if (localStorage.getItem('name')) {
        localStorage.setItem('name', localStorage.getItem('name'));
      }
    }
  },
  watch(h, m, s) {
    document.getElementById('title').innerHTML = `${h}:${m}:${s}`;
  }
};
View.prototype.reverse = {
  set() {
    flag.set('reverse', true);
    classFnc.add(document.getElementById('clock-face'), 'reverse');
  },
  unset() {
    flag.set('reverse', false);
    classFnc.remove(document.getElementById('clock-face'), 'reverse');
  }
};
View.prototype.ending = {
  set() {
    classFnc.add(document.getElementById('clock-face'), 'ending');
  },
  unset() {
    classFnc.remove(document.getElementById('clock-face'), 'ending');
  }
};
View.prototype.warning = {
  finishOff() {
    classFnc.add(document.getElementById('settings-end-continue'), 'warning');
    setTimeout(() => {
      classFnc.remove(document.getElementById('settings-end-continue'), 'warning');
    }, 1000);
  },
  reset() {
    classFnc.add(document.getElementById('set0'), 'stopwatch');
  }
};
view = new View();