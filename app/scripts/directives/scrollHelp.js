'use strict';

/**
 * @ngdoc directive
 * @name tscorerApp.directive:scrollHelp
 * @description
 * # scrollHelp
 */
angular.module('tscorerApp')
  .directive('scrollHelp', ['$timeout', function ($timeout) {
    return {
      restrict: 'A',
      link: function(scope, element) {
        element.bind("scroll", function() {
          $timeout(function(){
            if (element[0].scrollTop > angular.element('.scrolltarget').height()-element.height() ) {
              scope.showBottomHelp = false;
              scope.showTopHelp = true;
            } else if (element.scrollTop() < 100 ) {
              scope.showBottomHelp = true;
              scope.showTopHelp = false;
            } else {
              scope.showBottomHelp = false;
              scope.showTopHelp = false;
            }
          },500);
        });
        
      }
    };

  }]);