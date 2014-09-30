'use strict';

/**
 * @ngdoc service
 * @name tscorerApp.GameSettings
 * @description Contains the settings for the current game.  Persists data from setup view to game view
 * # GameSettings
 * Service in the tscorerApp.
 */
angular.module('tscorerApp')
  .service('GameSettings', function GameSettings() {
    // AngularJS will instantiate a singleton by calling "new" on this function

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
      serving: "p1",
      game: 0
    };

    var newgame = function(){
      return angular.copy(gamedefaults);
    };

    return {
      currentgame: gamedefaults,
      newgame: newgame
    };

  });

