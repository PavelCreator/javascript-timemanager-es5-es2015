describe("events_controller", function () {
  it("modalLogic.closeModal()", function () {
    expect(el.Modal._wrapper).to.be.visible;
    events.modalLogic.closeModal();
    expect(el.Modal._wrapper).to.not.be.visible;
  });
  it("modalLogic.openModal()", function () {
    expect(el.Modal._wrapper).to.not.be.visible;
    events.modalLogic.openModal();
    expect(el.Modal._wrapper).to.be.visible;
    events.modalLogic.closeModal();
  });
});

describe("watch_controller", function () {
  it("start()", function () {
    watch.start();
    var d = new Date();
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());
    assert.equal($(el.Settings.Mini_Watch.Clock_Face).text(), h+':'+m);
    timer.changeMode('watch');
    assert.equal($(el.Fields.Big_Clock.Hour).val(), h);
    assert.equal($(el.Fields.Big_Clock.Min).val(), m);
    assert.equal($(el.Fields.Big_Clock.Sec).val(), s);
    timer.changeMode('timer');
  });
});

describe("timer_controller", function () {
  it("changeMode()", function () {
    assert.equal(data.flag.mode, 'timer');
    timer.changeMode('stopwatch');
    assert.equal(data.flag.mode, 'stopwatch');
    timer.changeMode('watch');
    assert.equal(data.flag.mode, 'watch');
    timer.changeMode('timer');
    assert.equal(data.flag.mode, 'timer');
  });
  it("set(timeInMin)", function (done) {
    /*data.timeInSec = timeInMin * 60;*/
    timer.set(60);
    assert.equal(data.timeInSec, 3600);
    timer.set(0);

    /*timer.set(0)*/
    assert.equal(data.timeInSec, 0);
    assert.equal(data.flag.reverse, false);
    timer.startOrStop();
    setTimeout(function () {
      assert.equal(data.timeInSec, 1);
      assert.equal(data.flag.reverse, true);
      assert.equal(data.flag.stop, false);
      timer.set(0);
      assert.equal(data.timeInSec, 0);
      assert.equal(data.flag.reverse, false);
      assert.equal(data.flag.stop, true);
      done();
    }, 1000);
  });
  it("startOrStop()", function (done) {
    this.timeout(5000);
    timer.set(60);
    assert.equal(data.timeInSec, 3600);
    assert.equal(data.flag.stop, true);
    timer.startOrStop();
    setTimeout(function () {
      assert.equal(data.timeInSec, 3599);
      assert.equal(data.flag.stop, false);
      timer.startOrStop();
      assert.equal(data.timeInSec, 3599);
      assert.equal(data.flag.stop, true);
      setTimeout(function () {
        assert.equal(data.timeInSec, 3599);
        assert.equal(data.flag.stop, true);
        timer.set(0);
        done();
      }, 1000);
    }, 1000);
  });
  it("stop()", function (done) {
    this.timeout(5000);
    timer.set(60);
    assert.equal(data.timeInSec, 3600);
    assert.equal(data.flag.stop, true);
    timer.startOrStop();
    setTimeout(function () {
      assert.equal(data.timeInSec, 3599);
      assert.equal(data.flag.stop, false);
      timer.stop();
      assert.equal(data.timeInSec, 3599);
      assert.equal(data.flag.stop, true);
      setTimeout(function () {
        assert.equal(data.timeInSec, 3599);
        assert.equal(data.flag.stop, true);
        timer.set(0);
        done();
      }, 1000);
    }, 1000);
  });
});



/*describe("Local Storage behavior (HTML, Flags, Data)", function () {
  var
    soundMelodyId = localStorage.getItem("sound-melody"),
    soundVolume = localStorage.getItem("sound-volume"),
    finish = localStorage.getItem("finish"),
    soundPlay = localStorage.getItem("sound-play"),
    showWatch = localStorage.getItem("show-watch");

  describe("Check alarm-on/off", function () {
    if (soundPlay === '0') {
      it("Element is set, behavior has been verified", function () {
        expect($('#sound-off').attr('class')).to.have.string('hide');
        expect($('#sound-on').attr('class')).to.not.have.string('hide');
        expect($('#settings-melody').attr('class')).to.have.string('hide');
        expect($('#settings-alarm-on').attr('class')).to.not.have.string('active');
        expect($('#settings-alarm-off').attr('class')).to.have.string('active');
      });
    } else {
      it("Element isn't set, behavior has been verified", function () {
        expect($('#sound-off').attr('class')).to.not.have.string('hide');
        expect($('#sound-on').attr('class')).to.have.string('hide');
        expect($('#settings-melody').attr('class')).to.not.have.string('hide');
        expect($('#settings-alarm-on').attr('class')).to.have.string('active');
        expect($('#settings-alarm-off').attr('class')).to.not.have.string('active');
      });
    }
  });
  describe("Check melody-name", function () {
    if (soundMelodyId) {
      assert.equal(data.audioSettings.url, data.audios[soundMelodyId].url);
      assert.equal($('#melodies-list option:selected').html(), data.audios[soundMelodyId].name);
    }
  });
  describe("Check melody-volume", function () {
    if (soundVolume) {
      assert.equal(data.audioSettings.volume, soundVolume);
      assert.equal($('#volume-list option:selected').html(), soundVolume * 100 + '%');
    }
  });
});*/
