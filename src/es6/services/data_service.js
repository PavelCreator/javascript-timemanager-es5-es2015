class Data {
  constructor() {
    this.time = {
      h: '00',
      m: '00',
      s: '00'
    };
    this.timeInSec = 0;
    this.flag = new Map();
    this.audio = new Audio();
    this.audioSettings = {
      url: 'alarm_clock_1.mp3',
      volume: 0.7
    };
    this.audios = [
      {
        name: "Alarm Clock 1",
        url: "alarm_clock_1.mp3"
      },
      {
        name: "Alarm Clock 2",
        url: "alarm_clock_2.mp3"
      },
      {
        name: "Alarm Clock 3",
        url: "alarm_clock_3.mp3"
      },
      {
        name: "Alarm Clock 4",
        url: "alarm_clock_4.mp3"
      },
      {
        name: "School Bell",
        url: "school_bell.mp3"
      },
      {
        name: "SMS 1",
        url: "sms_1.mp3"
      },
      {
        name: "SMS 2",
        url: "sms_2.mp3"
      },
      {
        name: "SMS 3",
        url: "sms_3.mp3"
      },
      {
        name: "Telephone 1",
        url: "telephone_1.mp3"
      },
      {
        name: "Telephone 2",
        url: "telephone_2.mp3"
      },
      {
        name: "Message",
        url: "message.mp3"
      }
    ]
  }

  initFlags() {
    this.flag.set('stop', true);
    this.flag.set('reverse', false);
    this.flag.set('sound', true);
    this.flag.set('finish', false);
    this.flag.set('showWatch', true);
  }
}