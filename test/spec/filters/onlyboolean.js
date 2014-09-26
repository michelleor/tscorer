'use strict';

describe('Filter: onlyboolean', function () {

  // load the filter's module
  beforeEach(module('tscorerApp'));

  // initialize a new instance of the filter before each test
  var onlyboolean;
  beforeEach(inject(function ($filter) {
    onlyboolean = $filter('onlyboolean');
  }));

  it('should return the input prefixed with "onlyboolean filter:"', function () {
    var text = 'angularjs';
    expect(onlyboolean(text)).toBe('onlyboolean filter: ' + text);
  });

});
