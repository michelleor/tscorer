'use strict';

describe('Service: gamescoring', function () {

  // load the service's module
  beforeEach(module('tscorerApp'));

  // instantiate service
  var gamescoring;
  beforeEach(inject(function (_gamescoring_) {
    gamescoring = _gamescoring_;
  }));

  it('should do something', function () {
    expect(!!gamescoring).toBe(true);
  });

});
