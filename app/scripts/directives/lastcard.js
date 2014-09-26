'use strict';

/**
 * @ngdoc directive
 * @name tscorerApp.directive:lastCard
 * @description
 * # lastCard
 */
angular.module('tscorerApp')
  .directive('lastCard', ['$timeout', function ($timeout) {
    return {
      restrict: 'A',
      scope: {
        chaselength: '=',
        sizeclass: '='
      },
      link: function postLink(scope) {
        scope.$watch('chaselength',function(newval){
          if (newval) {
            //need to delay this until the ui has rendered
            $timeout(function(){
              var chasecard = document.getElementById('chasecard');
              var h2 = 137; //with one line of overflow
              var h3 = 161; //two lines of overflow
              //element.removeClass('size1 size2 size3');
              if (chasecard.clientHeight > h3 ) {
                scope.sizeclass = "size3";
              } else if (chasecard.clientHeight > h2) {
                scope.sizeclass = 'size2';
              } else {
                scope.sizeclass = 'size1';
              }
            },100);
          }
        });
      }
    };
  }]);
