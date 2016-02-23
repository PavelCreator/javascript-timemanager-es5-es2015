class Events {
  fieldFocusStopTimer() {
    var field = ['hour', 'min', 'sec'];
    for (let i = 0; i <= field.length - 1; i++) {
      document.getElementById(field[i]).onfocus = () => {
        view.ending.unset();
        timer.stop();
      };
    }
  }

  fieldInput() {
    var field = ['hour', 'min', 'sec'];
    for (let i = 0; i < field.length; i++) {
      document.getElementById(field[i]).onkeydown = function (e) {
        console.log(e);
        e.preventDefault();
        var pos = e.target.selectionStart;
        var num = timerSvc.getNumFromKeycode(e.keyCode);
        if (num !== false) {
          var positionEnd = view.setTimeFromKey(field[i], num, pos);
          if (positionEnd !== false) e.target.selectionEnd = positionEnd;
        }
      }
    }
  }

  keypress() {
    window.captureEvents(Event.KEYPRESS);
    window.onkeypress = pressed;
    function pressed(e) {
      var ctrlDown = e.ctrlKey || e.metaKey
      switch (e.which) {
        //Stop or Stop - Enter, Space
        case 32:
        case 13:
          document.getElementById('hidden').focus();
          timer.startOrStop();
          break;

        //Reset - `,r,¸,ê
        case 96:
        case 1105:
        case 114:
        case 1082:
          timer.set(0);
          break;
      }
      /*console.log(e.which);*/
    }
  }

  buttonPress() {
    var nums = ['0', '1', '2', '3', '5', '10', '15', '20', '30', '45', '60', '90', '120'];
    for (let i = 0; i <= nums.length - 1; i++) {
      document.getElementById("set" + nums[i]).onclick = () => {
        timer.set(nums[i]);
      };
    }
    document.getElementById("push").onclick = () => {
      timer.startOrStop();
    }
    document.getElementById("sound").onclick = () => {
      view.setSoundMode();
    }
    document.getElementById("finish").onclick = () => {
      view.setFinishMode();
    }
    document.getElementById("settings-melody-play").onclick = () => {
      view.setMelodyPlay(true);
    }
    document.getElementById("settings-melody-stop").onclick = () => {
      view.setMelodyPlay(false);
    }
    document.getElementById("toggle-watch").onclick = () => {
      view.toggleWatch();
    }
  }

  resizeEvent() {
    addEvent(window, "resize", function (event) {
      view.setMarginTop();
    });
  }

  changeMelodiesListEvent() {
    document.getElementById('melodies-list').onchange = () => {
      view.setMelodyPlay(false);
      var value = document.getElementById('melodies-list').value;
      document.getElementById('settings-melody-name').innerHTML = data.audios[value].name;
      data.audioSettings.url = data.audios[value].url;
      localStorage.setItem("sound-melody", value);
      view.setMelodyPlay(true);
    };
    document.getElementById('volume-list').onchange = () => {
      view.setMelodyPlay(false);
      var volume = document.getElementById('volume-list').value;
      data.audioSettings.volume = volume;
      localStorage.setItem("sound-volume", volume);
      view.setMelodyPlay(true);
    };
  }
}