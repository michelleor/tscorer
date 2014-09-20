'use strict';

/**
 * @ngdoc function
 * @name tscorerApp.controller:SetupCtrl
 * @description
 * # SetupCtrl
 * Controller of the tscorerApp
 */
angular.module('tscorerApp')
    .controller('SetupCtrl', ['$scope', 'Handicaps', 'AppSettings', 'GameSettings',
      function ( $scope, Handicaps, AppSettings, GameSettings) {
        $scope.setup = {};
        $scope.setup.gameTypes = AppSettings.gameTypes;
        $scope.setup.games = AppSettings.games;
        $scope.setup.setsPerMatch = AppSettings.sets;
        $scope.setup.p1 = {};
        $scope.setup.p1.serving = true;
        $scope.setup.p2 = {};
        $scope.setup.gameType = 'Singles';
        $scope.setup.handicap = true;
        $scope.setup.gamesPerSet = 6;
        $scope.setup.sets = 1;
        $scope.setup.serving = "p1";
        $scope.setup.playHcp = true;
        $scope.setup.calculateHcp = true;
        $scope.setup.playDuece = false;

        $scope.calculate = function (){
          var hcdata = Handicaps.calculateHandicaps($scope.setup.p1.hc, $scope.setup.p2.hc, $scope.setup.gameType);
          $scope.setup.p1.hcSettings = angular.copy(hcdata.p1);
          $scope.setup.p2.hcSettings = angular.copy(hcdata.p2);
          $scope.setup.lookupError = hcdata.message;
          if (! $scope.setup.lookupError ) {
            $scope.setup.showHcp = true;
            GameSettings.p1 = angular.copy($scope.setup.p1);
            GameSettings.gameType = $scope.setup.gameType;
            GameSettings.gamesPerSet = $scope.setup.GamesPerSet;
            GameSettings.setsPerMatch = $scope.setup.setsPerMatch;
            GameSettings.p2 = angular.copy($scope.setup.p2);
          }
        };

        $scope.hcpChanged = function(){
          $scope.setup.showHcp = false;
        };

        $scope.setServer = function() {
          if ($scope.setup.serving === "p1") {
            $scope.setup.p1.serving = true;
            $scope.setup.p2.serving = false;
          } else {
            $scope.setup.p1.serving = false;
            $scope.setup.p2.serving = true;
          }

        };
      }]);
