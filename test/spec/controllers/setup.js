'use strict';

describe('Controller: SetupctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('tscorerApp'));

  var SetupctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SetupctrlCtrl = $controller('SetupctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
