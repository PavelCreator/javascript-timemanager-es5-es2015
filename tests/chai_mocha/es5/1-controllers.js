describe("CONTROLLERS", function () {
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
      assert.equal($(el.Settings.Mini_Watch.Clock_Face).text(), h + ':' + m);
      timer.changeMode('watch');
      assert.equal($(el.Fields.Big_Clock.Hour).val(), h);
      assert.equal($(el.Fields.Big_Clock.Min).val(), m);
      assert.equal($(el.Fields.Big_Clock.Sec).val(), s);
      timer.changeMode('timer');
    });
  });

  describe("view_controller", function () {
    describe("renewTitle", function () {
      it("timer()", function () {
        for (var key in data.time) {
          data.time[key] = '15';
        }
        view.renewTitle.timer();
        expect(document.querySelector('title')).to.have.html('15:15:15 ');

        data.time.h = '00';
        view.renewTitle.timer();
        expect(document.querySelector('title')).to.have.html('15:15 ');
      });
      it("watch()", function () {
        view.renewTitle.watch('11', '11', '11');
        expect(document.querySelector('title')).to.have.html('11:11:11');
      });
    });
    describe("reverse", function () {
      it("set()", function () {
        view.reverse.set();
        assert.equal(data.flag.reverse, true);
        expect(document.querySelector('#clock-face')).to.have.class('reverse');
      });
      it("unset()", function () {
        view.reverse.unset();
        assert.equal(data.flag.reverse, false);
        expect(document.querySelector('#clock-face')).to.not.have.class('reverse');
      });
    });
    describe("ending", function () {
      it("set()", function () {
        view.ending.set();
        expect(document.querySelector('#clock-face')).to.have.class('ending');
      });
      it("unset()", function () {
        view.ending.unset();
        expect(document.querySelector('#clock-face')).to.not.have.class('ending');
      });
    });
    describe("warning", function () {
      it("finishOff()", function (done) {
        view.warning.finishOff();
        expect(document.querySelector('#settings-end-continue')).to.have.class('warning');
        setTimeout(function () {
          expect(document.querySelector('#settings-end-continue')).to.not.have.class('warning');
          done()
        }, 1000);
      });
      it("reset()", function () {
        view.warning.reset();
        expect(document.querySelector('#set0')).to.have.class('stopwatch');
      });
    });
    it("startOrStop()", function () {
      view.startOrStop('start');
      expect(document.querySelector(el.State.Run_Stop.Stop)).to.have.class('active');
      expect(document.querySelector(el.State.Run_Stop.Run)).to.not.have.class('active');
      view.startOrStop('stop');
      expect(document.querySelector(el.State.Run_Stop.Stop)).to.not.have.class('active');
      expect(document.querySelector(el.State.Run_Stop.Run)).to.have.class('active');
    });
    it("renewClockFace()", function () {
      view.renewClockFace();
      assert.equal(document.getElementById('hour').value, data.time.h);
      assert.equal(document.getElementById('min').value, data.time.m);
      assert.equal(document.getElementById('sec').value, data.time.s);
    });
    it("playSound()", function () {
      view.playSound();
      assert.equal(data.audio.volume, data.audioSettings.volume);
      assert.include(data.audio.src, '/timemanager/src/audio/' + data.audioSettings.url);
      assert.equal(data.audio.autoplay, true);
      view.stopSound();
    });
    it("setSoundMode()", function () {
      data.flag.sound = true;
      view.setSoundMode();
      assert.equal(data.flag.sound, false);
      expect(document.querySelector('#settings-melody')).to.have.class('hide');
      expect(document.querySelector('#settings-alarm-on')).to.not.have.class('active');
      expect(document.querySelector('#settings-alarm-off')).to.have.class('active');
      view.setSoundMode();
      assert.equal(data.flag.sound, true);
      expect(document.querySelector('#settings-melody')).to.not.have.class('hide');
      expect(document.querySelector('#settings-alarm-on')).to.have.class('active');
      expect(document.querySelector('#settings-alarm-off')).to.not.have.class('active');
    });
    it("setFinishMode()", function () {
      data.flag.finish = false;
      view.setFinishMode();
      assert.equal(data.flag.finish, true);
      expect(document.querySelector('#settings-end-continue')).to.not.have.class('active');
      expect(document.querySelector('#settings-end-stop')).to.have.class('active');
      view.setFinishMode();
      assert.equal(data.flag.finish, false);
      expect(document.querySelector('#settings-end-continue')).to.have.class('active');
      expect(document.querySelector('#settings-end-stop')).to.not.have.class('active');
    });
    it("setMelodyPlay()", function () {
      view.setMelodyPlay(true);
      expect(document.querySelector('#settings-melody-stop')).to.not.have.class('hide');
      expect(document.querySelector('#settings-melody-play')).to.have.class('hide');
      view.setMelodyPlay(false);
      expect(document.querySelector('#settings-melody-stop')).to.have.class('hide');
      expect(document.querySelector('#settings-melody-play')).to.not.have.class('hide');
    });
    it("changeMode()", function () {
      data.flag.mode = 'stopwatch'
      view.changeMode();
      expect(document.querySelector('#settings-mode-timer')).to.not.have.class('active');
      expect(document.querySelector('#settings-mode-stopwatch')).to.have.class('active');
      expect(document.querySelector('#settings-mode-watch')).to.not.have.class('active');
      data.flag.mode = 'watch'
      view.changeMode();
      expect(document.querySelector('#settings-mode-timer')).to.not.have.class('active');
      expect(document.querySelector('#settings-mode-stopwatch')).to.not.have.class('active');
      expect(document.querySelector('#settings-mode-watch')).to.have.class('active');
      data.flag.mode = 'timer'
      view.changeMode();
      expect(document.querySelector('#settings-mode-timer')).to.have.class('active');
      expect(document.querySelector('#settings-mode-stopwatch')).to.not.have.class('active');
      expect(document.querySelector('#settings-mode-watch')).to.not.have.class('active');
    });
    /*it("startOrStop()", function () {

     });
     it("startOrStop()", function () {

     });
     it("startOrStop()", function () {

     });
     it("startOrStop()", function () {

     });
     it("startOrStop()", function () {

     });*/

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
});