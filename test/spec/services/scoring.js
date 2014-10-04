'use strict';

describe('Service: Scoring', function () {

  // load the service's module
  beforeEach(module('tscorerApp'));

  // instantiate service
  var Scoring;
  beforeEach(inject(function (_Scoring_) {
    Scoring = _Scoring_;
  }));

  it('should do something', function () {
    expect(!!Scoring).toBe(true);
  });

});
