'use strict';

describe('Directive: scrollTop', function () {

  // load the directive's module
  beforeEach(module('tscorerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<scroll-top></scroll-top>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the scrollTop directive');
  }));
});
