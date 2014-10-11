'use strict';

/**
 * @ngdoc function
 * @name tscorerApp.controller:SetupCtrl
 * @description
 * # SetupCtrl
 * Controller of the tscorerApp
 */
angular.module('tscorerApp')
  .controller('SetupCtrl', function ( $scope, Handicaps, AppSettings, GameSettings, $location) {
    $scope.gamesettings = GameSettings.currentgame; //reference common object to persist between views
    $scope.setup = AppSettings;
    $scope.displaySettings = {};
    $scope.displaySettings.showHcp = false;

    $scope.calculate = function calculate(){
      var hcdata = Handicaps.calculateHandicaps($scope.gamesettings.p1.hc, $scope.gamesettings.p2.hc,
        $scope.gamesettings.gameType);
      $scope.gamesettings.p1.hcSettings = angular.copy(hcdata.p1);
      $scope.gamesettings.p2.hcSettings = angular.copy(hcdata.p2);
      $scope.setup.lookupError = hcdata.message;
      if (hcdata.message === "") {
        $scope.displaySettings.showHcp = true;
      }
    };

    $scope.hcpChanged = function hcpchanged(){
      $scope.displaySettings.showHcp = false;
    };

    $scope.setServer = function setServer() {
      if ($scope.gamesettings.serving === "p1") {
        $scope.gamesettings.p1.serving = true;
        $scope.gamesettings.p2.serving = false;
      } else {
        $scope.gamesettings.p1.serving = false;
        $scope.gamesettings.p2.serving = true;
      }

    };

    $scope.changeGames = function changeGames() {
      if ($scope.gamesettings.gamesPerSet === "0") {
        $scope.gamesettings.setsPerMatch = 0;
      }
    };

    $scope.changeSets = function changeSets() {
      if ($scope.gamesettings.setsPerMatch === "0") {
        $scope.gamesettings.gamesPerSet = "0";
      } else {
        if ($scope.gamesettings.gamesPerSet === "0") {
          $scope.gamesettings.gamesPerSet = "6";
        }
      }
    };

    $scope.playGame = function playGame() {
      $location.path('Game');
    };

  });
