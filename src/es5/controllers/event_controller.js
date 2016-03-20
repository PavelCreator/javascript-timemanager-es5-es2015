function Events(){
  var fieldFocusStopTimer = function () {
    var field = ['hour', 'min', 'sec'];
    for (var i = 0; i <= field.length - 1; i++) {
      document.getElementById(field[i]).onfocus = function () {
        view.ending.unset();
        timer.stop();
      };
    }
  };
  var fieldInsertTimerName = function () {
    document.getElementById('timer-name').onfocus = function () {
      data.flag.disableKeyEvents = true;
    };
    document.getElementById('timer-name').onblur = function () {
      data.flag.disableKeyEvents = false;
    };
    document.getElementById('timer-name').oninput = function () {
      view.renewTitle.timer();
    };
  };
  var fieldInput = function () {
    var field = ['hour', 'min', 'sec'];
    for (var i = 0; i < field.length; i++) {
      document.getElementById(field[i]).onkeydown = (function (fieldName) {
        return function (e) {
          console.log(e);
          e.preventDefault();
          var pos = e.target.selectionStart;
          var num = timerSvc.getNumFromKeycode(e.keyCode);
          if (num !== false) {
            var positionEnd = view.setTimeFromKey(fieldName, num, pos);
            if (positionEnd !== false) e.target.selectionEnd = positionEnd;
          }
        }
      })(field[i]);
    }
  };
  var keypress = function () {
    window.captureEvents(Event.KEYPRESS);
    window.onkeypress = pressed;
    function pressed(e) {
      var ctrlDown = e.ctrlKey || e.metaKey
      switch (e.which) {
        //Stop or Stop - Enter, Space
        case 32:
          if (!data.flag.disableKeyEvents) {
            document.getElementById('hidden').focus();
            timer.startOrStop();
          }
          break;
        case 13:
          if (!data.flag.disableKeyEvents) {
            document.getElementById('hidden').focus();
            timer.startOrStop();
          }else{
            document.getElementById('hidden').focus();
          }
          break;

        //Reset - `,r
        case 96:
        case 1105:
        case 114:
        case 1082:
          if (!data.flag.disableKeyEvents) {
            timer.set(0);
          }
          break;
      }
      /*console.log(e.which);*/
    }
  };
  var buttonPress = function () {
    var nums = data.timeButtonArr;
    for (var i = 0; i <= nums.length - 1; i++) {
      document.getElementById("set" + nums[i]).onclick = (function (x) {
        return function () {
          timer.set(nums[x]);
        }
      })(i);
    }
    document.getElementById("push").onclick = function () {
      timer.startOrStop();
    }
    document.getElementById('settings-alarm-on').onclick = function () {
      if (data.flag.sound === false) {
        view.setSoundMode();
      }
    }
    document.getElementById('settings-alarm-off').onclick = function () {
      if (data.flag.sound === true) {
        view.setSoundMode();
      }
    }
    document.getElementById("settings-end-continue").onclick = function () {
      if (data.flag.finish === true) {
        view.setFinishMode();
      }
    }
    document.getElementById("settings-end-stop").onclick = function () {
      if (data.flag.finish === false) {
        if (data.flag.reverse){
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
    var modes = ['timer', 'stopwatch', 'watch'];
    for (var i = 0; i < modes.length; i++) {
      document.getElementById("settings-mode-" + modes[i]).onclick = (function (x) {
        return function () {
          if (data.flag.mode !== modes[x]) {
            timer.changeMode(modes[x]);
            view.changeMode();
          }
        }
      })(i);
    }
  };
  var resizeEvent = function () {
    addEvent(window, "resize", function (event) {
      view.setMarginTop();
    });
  };
  var changeMelodiesListEvent = function () {
    document.getElementById('melodies-list').onchange = function () {
      view.setMelodyPlay(false);
      var value = document.getElementById('melodies-list').value;
      document.getElementById('settings-melody-name').innerHTML = data.audios[value].name;
      data.audioSettings.url = data.audios[value].url;
      localStorage.setItem("sound-melody", value);
      view.setMelodyPlay(true);
    };
    document.getElementById('volume-list').onchange = function () {
      view.setMelodyPlay(false);
      var volume = document.getElementById('volume-list').value;
      data.audioSettings.volume = volume;
      localStorage.setItem("sound-volume", volume);
      view.setMelodyPlay(true);
    };
  };
  this.onStart = function(){
    keypress();
    buttonPress();
    fieldFocusStopTimer();
    fieldInsertTimerName();
    resizeEvent();
    fieldInput();
    changeMelodiesListEvent();
  };
}
events = new Events();