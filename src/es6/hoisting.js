class FlashMessage {
    constructor (message){
        this.message = message ;
    }
    display(){
        console.log(this.message);
    }
}
let flash = new FlashMessage("Gulp, Babel and Browserify");

flash.display();

var
  /*Entities*/
  timer,
  watch,
  events,
  view,

  /*Timeout*/
  oneSec,

  /*App Services*/
  timerSvc,
  data,

  /*Auxiliary Services*/
  logger,
  classFnc,
  addEvent,
  getCursorPosition,
  addZero
  ;
