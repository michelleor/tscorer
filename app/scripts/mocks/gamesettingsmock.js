'use strict';

/**
 * @ngdoc service
 * @name tscorerAppMocks.GameSettingsMock
 * @description
 * # GameSettingsMock
 * Service in the tscorerApp.
 */
angular.module('tscorerAppMocks')
  .service('GameSettingsMock', function GameSettings() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var Settings = {};

    var gamedefaults = {
      p1: {
        serving:true,
        name:"Michelle",
        hc:68,
        hcSettings:{
          "description":"Receive half 30",
          "startingScores":["r1", "r2", "r1", "r2"],
          "serves":2,
          "key":"rechalf30"
        }
      },

      p2: {
        name:"Evelyn",
        hc:54,
        hcSettings:{
          "description":"Owe 15",
          "startingScores":["o1","o1","o1","o1"],
          "serves":2,
          "key":"owe15"
        },
        games: 0
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
