'use strict';

describe('Controller: SetupCtrl', function () {

  // load the controller's module
  beforeEach(module('tscorerApp'));

  var setup;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    setup = $controller('SetupCtrl', {});
  }));

  it('should have a default game type of Singles', function () {
    expect(setup.gameType).toBe('Singles');
  });

  it('should start with player / pair one serving', function () {
    expect(setup.p1.serving).toBe(true);
    expect(setup.p2.serving).toBeFalsy();
  });

  it('setServer function should set the correct player / pair server flag', function () {
    setup.serving = "p2";
    setup.setServer();
    expect(setup.p1.serving).toBe(false);
    expect(setup.p2.serving).toBe(true);
  });
});

describe('Controller: SetupCtrl, function:calculate()', function () {

  // load the controller's module
  beforeEach(module('tscorerApp'));

  var setup;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    setup = $controller('SetupCtrl', {});
  }));

  it('should set the handicap properties from the scope values', function () {
    setup.gameType = "Doubles";
    setup.p1.hc = 54;
    setup.p2.hc = 50;
    setup.calculate();
    expect(setup.p1.hcSettings.key).toEqual("rechalf15");
    expect(setup.p2.hcSettings.key).toEqual("love");
    expect(setup.lookupError).toEqual("");
  });

  it('should set the showHcp flag when there is no message', function () {
    setup.gameType = "Singles";
    setup.p1.hc = 60;
    setup.p2.hc = 50;
    setup.calculate();
    expect(setup.showHcp).toEqual(true);
  });

  it('should NOT set the showHcp flag when there is no message', function () {
    setup.gameType = "Singles";
    setup.p1.hc = 60;
    setup.p2.hc = 5;
    setup.calculate();
    expect(setup.showHcp).toBeFalsy();
  });

});
