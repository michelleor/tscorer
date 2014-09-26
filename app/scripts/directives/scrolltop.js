'use strict';

/**
 * @ngdoc directive
 * @name tscorerApp.directive:scrollTop
 * @description
 * # scrollTop
 */
angular.module('tscorerApp')
  .directive('scrollTop', ['$timeout', function ($timeout) {
    return {
      scope: {
        trigger: '=',
        testvalue: '='
      },
      restrict: 'A',
      link: function postLink(scope, element) {
        scope.$watch('trigger',function(newval){
          if (newval) {
            $timeout(function(){
              element[0].scrollTop = 10000;
            },200);
          }
        });
      }
    };
  }]);
