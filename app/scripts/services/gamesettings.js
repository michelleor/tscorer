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

    return {
      p1: {},
      p2: {},
      gameType: "",
      gamesPerSet: 0,
      setsPerMatch: 0
    };
  });
