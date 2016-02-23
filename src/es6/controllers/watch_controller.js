class Watch {
  start() {
    var d = new Date();
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var currentTime = h+'<span>:</span>'+m
    if (document.getElementById('watch').innerHTML != currentTime){
      document.getElementById('watch').innerHTML = currentTime;
    }
    setTimeout(function () {
      watch.start();
    }, 1000);
  }
}