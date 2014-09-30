'use strict';

/**
 * @ngdoc directive
 * @name tscorerApp.directive:chaseSelect
 * @description
 * # chaseSelect
 */
angular.module('tscorerApp')
  .directive('chaseSelect', ['$compile', '$popover', function ($compile, $popover) {
    return {
      scope: {
        chase: '=',
        targetfn: '&',
        hidefn: '&'
      },
      restrict: 'E',
      //template: 
      //replace: true,
      link: function postLink(scope, element, attrs) {
        var html, newelem, pop;

        if ( scope.chase.choices ) {
          //first level popover
          html = '<div class="select-row"><div class="anchor"></div><div class="row-data">{{chase.label}}</div></div>';
          scope.chases = scope.chase.choices;
        } else {
          //second level 
          html = '<div class="select-row" ng-click="targetfn(chase)">{{chase.name}}</div>';
        }
        element.html(html);
        newelem = $compile(element.html())(scope);
        element.replaceWith(newelem);

        if (scope.chase.choices) {
          pop = $popover(newelem, {
            scope: scope,
            title: 'Refine chase',
            trigger: 'manual',
            template: 'templates/chasespopover.html',
            target: newelem.find('div')
          });
          newelem.bind('click',function(){
            newelem.toggleClass("selected");
            if (attrs.placement === "right") {
              pop.$options.placement = "left";
            }
            pop.toggle();
          });

          scope.setChase = function(chase) {
            pop.hide();
            scope.hidefn();
            scope.targetfn({chase:chase});
          };
        }
      }
    };
  }]);
