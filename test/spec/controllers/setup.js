'use strict';

describe('Controller: SetupCtrl', function () {

  // load the controller's module
  beforeEach(module('tscorerApp'));

  var SetupCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SetupCtrl = $controller('SetupCtrl', {
      $scope: scope
    });
  }));

  it('should have a default game type of Singles', function () {
    expect(scope.setup.gameType).toBe('Singles');
  });

  it('should start with player / pair one serving', function () {
    expect(scope.setup.p1.serving).toBe(true);
    expect(scope.setup.p2.serving).toBeFalsy();
  });

  it('setServer function should set the correct player / pair server flag', function () {
    scope.setup.serving = "p2";
    scope.setServer();
    expect(scope.setup.p1.serving).toBe(false);
    expect(scope.setup.p2.serving).toBe(true);
  });
});

describe('Controller: SetupCtrl, function:calculate()', function () {

  // load the controller's module
  beforeEach(module('tscorerApp'));

  var setup, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    setup = $controller('SetupCtrl', {
      $scope: scope
    });
  }));

  it('should set the handicap properties from the scope values', function () {
    scope.setup.gameType = "Doubles";
    scope.setup.p1.hc = 54;
    scope.setup.p2.hc = 50;
    scope.calculate();
    expect(scope.setup.p1.hcSettings.key).toEqual("rechalf15");
    expect(scope.setup.p2.hcSettings.key).toEqual("love");
    expect(scope.setup.lookupError).toEqual("");
  });

  it('should set the showHcp flag when there is no message', function () {
    scope.setup.gameType = "Singles";
    scope.setup.p1.hc = 60;
    scope.setup.p2.hc = 50;
    scope.calculate();
    expect(scope.setup.showHcp).toEqual(true);
  });

  it('should NOT set the showHcp flag when there is no message', function () {
    scope.setup.gameType = "Singles";
    scope.setup.p1.hc = 60;
    scope.setup.p2.hc = 5;
    scope.calculate();
    expect(scope.setup.showHcp).toBeFalsy();
  });

  it('should start with handicaps on',function(){
    expect(scope.setup.playHcp).toBe(true);
  });
});
