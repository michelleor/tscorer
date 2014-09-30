'use strict';

/**
 * @ngdoc function
 * @name tscorerApp.controller:StartCtrl
 * @description
 * # StartCtrl
 * Controller of the tscorerApp
 */
angular.module('tscorerApp')
  .controller('StartCtrl', ['$scope', '$location', 'GameSettings', function ($scope, $location, GameSettings) {

	  $scope.startGame = function() {
	    GameSettings.currentgame = GameSettings.newgame();
	    $location.path('Setup');
	  };
  }]);
