'use strict';

/**
 * @ngdoc filter
 * @name tscorerApp.filter:matchboolean
 * @function
 * @description
 * # matchboolean
 * Filter in the tscorerApp.
 */
angular.module('tscorerApp')
  .filter('matchboolean', function () {
    return function(input, paramname, param){
      var ret = [];
      if(!angular.isDefined(param)) {
        param = true;
      }
      angular.forEach(input, function(v){
        if ((angular.isDefined(v[paramname]) && v[paramname] === param) ||
          ( !angular.isDefined(v[paramname]) && param === false )){
          ret.push(v);
        }
      });
      return ret;
    };
  });
