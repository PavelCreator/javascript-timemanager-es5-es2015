expect(document.querySelector(el.State.Run_Stop.Stop)).to.have.class('active');
expect(document.querySelector(el.State.Run_Stop.Run)).to.not.have.class('active');

expect(document.querySelector('title')).to.have.html('Chai Tea');
expect(document.querySelector('title')).to.contain.html('<em>Tea</em>');


expect(el.Modal._wrapper).to.not.be.visible;
expect(el.Modal._wrapper).to.be.visible;
assert.equal(data.flag.mode, 'timer');

it("startOrStop()", function (done) {
  setTimeout(function () {
    done();
  }, 1000);
});