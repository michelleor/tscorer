'use strict';

/**
 * @ngdoc function
 * @name tscorerApp.controller:SetupCtrl
 * @description
 * # SetupCtrl
 * Controller of the tscorerApp
 */
angular.module('tscorerApp')
    .controller('SetupCtrl', ['Handicaps', 'AppSettings', 'GameSettings',
      function ( Handicaps, AppSettings, GameSettings) {
        this.gameTypes = AppSettings.gameTypes;
        this.games = AppSettings.games;
        this.setsPerMatch = AppSettings.sets;
        this.p1 = {};
        this.p1.serving = true;
        this.p2 = {};
        this.gameType = 'Singles';
        this.handicap = true;
        this.gamesPerSet = 6;
        this.sets = 1;
        this.serving = "p1";

        this.calculate = function (){
          var hcdata = Handicaps.calculateHandicaps(this.p1.hc, this.p2.hc, this.gameType);
          this.p1.hcSettings = angular.copy(hcdata.p1);
          this.p2.hcSettings = angular.copy(hcdata.p2);
          this.lookupError = hcdata.message;
          if (! this.lookupError ) {
            this.showHcp = true;
            GameSettings.p1 = angular.copy(this.p1);
            GameSettings.gameType = this.gameType;
            GameSettings.p2 = angular.copy(this.p2);
          }
        };

        this.hcpChanged = function(){
          this.showHcp = false;
        };

        this.setServer = function() {
          if (this.serving === "p1") {
            this.p1.serving = true;
            this.p2.serving = false;
          } else {
            this.p1.serving = false;
            this.p2.serving = true;
          }

        };
      }]);
