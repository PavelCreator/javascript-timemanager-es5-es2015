/*Begin*/
events.keypress();
events.buttonPress();
events.fieldFocusStopTimer();
events.resizeEvent();
view.renewClockFace();
view.setMarginTop();
view.buildMelodiesList();
events.changeMelodiesListEvent();
view.setSettingsFromStorage();

console.log("data.flag =", data.flag);