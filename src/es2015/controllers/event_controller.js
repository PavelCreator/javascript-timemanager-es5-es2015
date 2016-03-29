class Events {
  fieldFocusStopTimer () {
    const field = data.hms;
    for (let i = 0; i <= field.length - 1; i++) {
      document.getElementById(field[i]).onfocus = function () {
        view.ending.unset();
        timer.stop();
      };
    }
  };
  fieldInsertTimerName () {
    document.getElementById('timer-name').onfocus = function () {
      flag.set('disableKeyEvents', true);
    };
    document.getElementById('timer-name').onblur = function () {
      flag.set('disableKeyEvents', false);
    };
    document.getElementById('timer-name').oninput = function () {
      view.renewTitle.timer();
      localStorage.setItem('name', document.getElementById('timer-name').value)
    };
  };
  fieldInput () {
    const field = data.hms;
    for (let i = 0; i < field.length; i++) {
      document.getElementById(field[i]).onkeydown = (function (fieldName) {
        return function (e) {
          console.log(e);
          e.preventDefault();
          let pos = e.target.selectionStart;
          let num = timerSvc.getNumFromKeycode(e.keyCode);
          if (num !== false) {
            let positionEnd = view.setTimeFromKey(fieldName, num, pos);
            if (positionEnd !== false) e.target.selectionEnd = positionEnd;
          }
        }
      })(field[i]);
    }
  };
  keypress () {
    window.captureEvents(Event.KEYPRESS);
    window.onkeypress = pressed;
    function pressed(e) {
      let ctrlDown = e.ctrlKey || e.metaKey
      switch (e.which) {
        //Stop or Stop - Enter, Space
        case 32:
          if (!flag.get('disableKeyEvents') && (flag.get('mode') !== 'watch')) {
            document.getElementById('hidden').focus();
            timer.startOrStop();
          }
          break;
        case 13:
          if (!flag.get('disableKeyEvents') && (flag.get('mode') !== 'watch')) {
            document.getElementById('hidden').focus();
            timer.startOrStop();
          } else {
            document.getElementById('hidden').focus();
          }
          break;

        //Reset - `,r
        case 96:
        case 1105:
        case 114:
        case 1082:
          if (!flag.get('disableKeyEvents')) {
            timer.set(0);
          }
          break;
      }
      /*console.log(e.which);*/
    }
  };
  buttonPress () {
    const nums = data.timeButtonArr;
    for (let i = 0; i <= nums.length - 1; i++) {
      document.getElementById(`set${nums[i]}`).onclick = (function (x) {
        return function () {
          timer.set(nums[x]);
        }
      })(i);
    }
    document.getElementById("push").onclick = function () {
      timer.startOrStop();
    }
    document.getElementById('settings-alarm-on').onclick = function () {
      if (flag.get('sound') === false) {
        view.setSoundMode();
      }
    }
    document.getElementById('settings-alarm-off').onclick = function () {
      if (flag.get('sound') === true) {
        view.setSoundMode();
      }
    }
    document.getElementById("settings-end-continue").onclick = function () {
      if (flag.get('finish') === true) {
        view.setFinishMode();
      }
    }
    document.getElementById("settings-end-stop").onclick = function () {
      if (flag.get('finish') === false) {
        if (flag.get('reverse')) {
          timer.set('0');
        }
        view.setFinishMode();
      }
    }

    document.getElementById("settings-melody-play").onclick = function () {
      view.setMelodyPlay(true);
    }
    document.getElementById("settings-melody-stop").onclick = function () {
      view.setMelodyPlay(false);
    }
    const modes = data.modes;
    for (let i = 0; i < modes.length; i++) {
      document.getElementById(`settings-mode-${modes[i]}`).onclick = (function (x) {
        return function () {
          if (flag.get('mode') !== modes[x]) {
            timer.changeMode(modes[x]);
            view.changeMode();
          }
        }
      })(i);
    }
    document.getElementById("copyToClipboard").onclick = function () {
      view.copyToClipboard();
    }
  };
  resizeEvent () {
    addEvent(window, "resize", function (event) {
      view.setMarginTop();
    });
  };
  changeMelodiesListEvent () {
    document.getElementById('melodies-list').onchange = function () {
      view.setMelodyPlay(false);
      let value = document.getElementById('melodies-list').value;
      document.getElementById('settings-melody-name').innerHTML = data.audios[value].name;
      data.audioSettings.url = data.audios[value].url;
      localStorage.setItem("sound-melody", value);
      view.setMelodyPlay(true);
    };
    document.getElementById('volume-list').onchange = function () {
      view.setMelodyPlay(false);
      let volume = document.getElementById('volume-list').value;
      data.audioSettings.volume = volume;
      localStorage.setItem("sound-volume", volume);
      view.setMelodyPlay(true);
    };
  };
  onStart() {
    this.keypress();
    this.buttonPress();
    this.fieldFocusStopTimer();
    this.fieldInsertTimerName();
    this.resizeEvent();
    this.fieldInput();
    this.changeMelodiesListEvent();
    this.modalLogic.watchers();
  };
}
Events.prototype.modalLogic = {
  watchers: function () {
    document.getElementById("openModal").onclick = function () {
      events.modalLogic.openModal();
    }
    document.getElementById("closeModal").onclick = function () {
      events.modalLogic.closeModal();
    }
    window.onclick = function (event) {
      if (event.target == document.getElementById('modalWrapper')) {
        events.modalLogic.closeModal();
      }
    }
  },
  openModal: function () {
    document.getElementById('modalWrapper').style.display = "block";
    document.getElementsByTagName("html")[0].style.overflow = "hidden";
  },
  closeModal: function () {
    document.getElementById('modalWrapper').style.display = "none";
    document.getElementsByTagName("html")[0].style.overflow = "auto";
  }
}
events = new Events();