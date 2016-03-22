var el = {
  URL: 'http://timer.dev/timemanager/',
  Buttons: {
    Min_1: '#set1',
    Min_2: '#set2',
    Min_5: '#set5',
    Min_10: '#set10',
    Min_15: '#set15',
    Min_20: '#set20',
    Min_30: '#set30',
    Min_45: '#set45',
    Hour_1: '#set60',
    Hour_2: '#set120',
    Reset: '#set0',
    Run_Stop: "#push"
  },
  Fields: {
    Timer: {
      Hour: '#hour',
      Min: '#min',
      Sec: '#sec'
    },
    Big_Clock: {
      Hour: '#w-hour',
      Min: '#w-min',
      Sec: '#w-sec'
    }
  },
  Settings: {
    Mode: {
      Timer: '#settings-mode-timer',
      Stop_Watch: '#settings-mode-stopwatch',
      Watch: '#settings-mode-watch',
    },
    Alarm: {
      _wrapper: '#settings-alarm-wrapper',
      On: '#settings-alarm-on',
      Off: '#settings-alarm-off'
    },
    In_The_End: {
      _wrapper: '#settings-end-continue-wrapper',
      Continue: '#settings-end-continue',
      Stop: '#settings-end-stop'
    },
    Melody: {
      _wrapper: '#settings-melody',
      Play: '#settings-melody-play',
      Stop: '#settings-melody-stop',
      Change: '#melodies-list',
      Volume: '#volume-list',
      Current_Melody: '#settings-melody-name'
    },
    Name: {
      _wrapper: '#settings-name-wrapper',
      Field: '#timer-name'
    },
    Mini_Watch: {
      _wrapper: '#watch-clock-face',
      Clock_Face: '#watch'
    }
  },
  State:{
    Run_Stop:{
      Run:'#run',
      Stop:'#stop'
    },
    Big_Timer_Wrapper:'#clock-face',
    Big_Watch_Wrapper:'#w-clock-face'
  },
  Modal:{
    _wrapper: '#modalWrapper',
    Close:'#closeModal',
    Open:'#openModal'
  }
};
