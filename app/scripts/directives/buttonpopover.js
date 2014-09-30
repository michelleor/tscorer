'use strict';

/**
 * @ngdoc directive
 * @name tscorerApp.directive:buttonPopover
 * @description
 * # buttonPopover
 */
angular.module('tscorerApp')
  .directive('buttonPopover', ['$popover', function ($popover) {
    return {
      scope: {
        chases: '=values',
        targetfn: '&'
      },
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        scope.placement = attrs.placement;
        var pop = $popover(element, {
          scope: scope,
          title: 'Select chase',
          trigger: 'manual',
          template: 'templates/chasespopover.html',
          placement: attrs.placement
        });
        element.bind('click',function(){
          pop.toggle();
        });

        scope.setChase = function(chase) {
          scope.targetfn({chase:chase});
        };
      }
    };

  }]);
