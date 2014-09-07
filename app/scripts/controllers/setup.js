'use strict';

/**
 * @ngdoc function
 * @name tscorerApp.controller:SetupCtrl
 * @description
 * # SetupCtrl
 * Controller of the tscorerApp
 */
angular.module('tscorerApp')
    .controller('SetupCtrl', ['$scope', 'GameSettings', function ($scope, GameSettings) {
        $scope.settings = {};//to keep jshint happy
        this.gamesettings = GameSettings;
        this.gameType = 'Singles';
        this.handicap = true;
        this.gamesPerSet = 6;

        this.calculate = function (){
          this.showHcp = true;
        };

        this.hcpChanged = function(){
          this.showHcp = false;
        };
      }]);
