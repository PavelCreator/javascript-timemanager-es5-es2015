describe("SERVICES", function () {
  describe("app_service", function () {
    it("fromTimeToSec()", function () {
      data.time.h = '01';
      data.time.m = '02';
      data.time.s = '03';
      timerSvc.fromTimeToSec();
      assert.equal(data.timeInSec, 3723);
      data.time.s = 61;
      timerSvc.fromTimeToSec();
      assert.equal(data.time.s, 60);
      data.time.m = 61;
      timerSvc.fromTimeToSec();
      assert.equal(data.time.m, 59);
      assert.equal(data.time.s, 60);
    });
    it("fromSecToTime()", function () {
      data.timeInSec = 1;
      timerSvc.fromSecToTime();
      assert.equal(data.time.h, '00');
      assert.equal(data.time.m, '00');
      assert.equal(data.time.s, '01');

      data.timeInSec = 1000;
      timerSvc.fromSecToTime();
      assert.equal(data.time.h, '00');
      assert.equal(data.time.m, '16');
      assert.equal(data.time.s, '40');

      data.timeInSec = 10000;
      timerSvc.fromSecToTime();
      assert.equal(data.time.h, '02');
      assert.equal(data.time.m, '46');
      assert.equal(data.time.s, '40');

      data.timeInSec = 100000;
      timerSvc.fromSecToTime();
      assert.equal(data.time.h, '27');
      assert.equal(data.time.m, '46');
      assert.equal(data.time.s, '40');
    });
    it("getValuesFromHTML()", function () {
      timerSvc.getValuesFromHTML();
      assert.equal(data.time.h, '00');
      assert.equal(data.time.m, '00');
      assert.equal(data.time.s, '00');
    });
    it("getNumFromKeycode()", function () {
      assert.equal(timerSvc.getNumFromKeycode(37), 'left');
      assert.equal(timerSvc.getNumFromKeycode(52), '4');
      assert.equal(timerSvc.getNumFromKeycode(200), false);
    });
  });
  describe("auxiliary_service", function () {
    describe("classFnc", function () {
      it("add()", function () {
        classFnc.add(document.getElementById('settings-melody-stop'), 'hide');
        expect(document.querySelector('#settings-melody-stop')).to.have.class('hide');
      });
      it("remove()", function () {
        classFnc.remove(document.getElementById('settings-melody-stop'), 'hide');
        expect(document.querySelector('#settings-melody-stop')).to.not.have.class('hide');
      });
    });
    it("addZero()", function () {
      assert.equal(addZero(1), '01');
      assert.equal(addZero(56), '56');
    });
  });
});