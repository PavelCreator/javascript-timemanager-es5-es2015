/*App Services*/
let timerSvc = new TimerSvc();
let data = new Data();
data.initFlags();

/*Entities*/
let timer = new Timer();
let watch = new Watch();
let events = new Events();
let view = new View();

/*Timeout*/
let oneSec;

/*Begin*/
events.keypress();
events.buttonPress();
events.fieldFocusStopTimer();
events.resizeEvent();
events.fieldInput();
view.renewClockFace();
view.setMarginTop();
view.buildMelodiesList();
events.changeMelodiesListEvent();
view.setSettingsFromStorage();
watch.start();
