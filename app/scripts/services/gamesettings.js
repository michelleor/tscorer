'use strict';

/**
 * @ngdoc factory
 * @name tscorerApp.GameSettings
 * @description Contains the settings for the current game.  Persists data from setup view to game view
 * # GameSettings
 * Service in the tscorerApp.
 */
angular.module('tscorerApp')
  .factory('GameSettings', function GameSettings() {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var Settings = {};

    var gamedefaults = {
      p1: {
        points: "l",
        hcSettings: {
          "description":"Love",
          "startingScores":["l","l","l","l"],
          "serves":2,
          "key":"love"
        },
        serving: true
      },
      p2: {
        points: "l",
        hcSettings: {
          "description":"Love",
          "startingScores":["l","l","l","l"],
          "serves":2,
          "key":"love"
        },
        serving: false
      },
      gameType: "Singles",
      gamesPerSet: "6",
      setsPerMatch: 1,
      handicap: true,
      calculateHcp: true,
      playDuece: false,
      playAdvantage: true,
      serving: "p1"
    };

    //object to hold game settings as it progresses
    Settings.currentgame = angular.copy(gamedefaults);

    Settings.getdisplaySettings = function getdisplaySettings(){
      return {
        gameType: Settings.currentgame.gameType,
        gamesPerSet: Settings.currentgame.gamesPerSet,
        setsPerMatch: Settings.currentgame.setsPerMatch,
        handicap: Settings.currentgame.handicap,
        p1hcp: Settings.currentgame.p1.hcSettings.description,
        p2hcp: Settings.currentgame.p2.hcSettings.description
      };
    };

    //method to clear and reset game
    Settings.newgame = function newgame(){
      Settings.currentgame = angular.copy(gamedefaults);
    };


    return Settings;

  });

