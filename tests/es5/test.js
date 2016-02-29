describe("Behavior on app init", function () {
  it("Check 00:00:00", function () {
    for (key in data.time) {
      assert.equal(data.time[key], '00');
    }
  });
});
describe("Local Storage behavior (HTML, Flags, Data)", function () {
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
});
