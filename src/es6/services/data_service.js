data = {
  time: {
    h: '00',
    m: '00',
    s: '00'
  },
  timeInSec: 0,
  flag: new Map(),
  audio: new Audio(),
  audioSettings:{
    url: 'alarm_clock_1.mp3',
    volume: 0.7
  },
  audios: [
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
data.flag.set('stop', true);
data.flag.set('reverse', false);
data.flag.set('sound', true);
data.flag.set('finish', false);
data.flag.set('showWatch', true);