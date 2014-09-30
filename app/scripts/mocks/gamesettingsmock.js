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
    var gamedefaults = {
      p1: {
        serving:true,
        name:"Michelle",
        hc:68,
        hcSettings:{
          "description":"Receive 15",
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
        }
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
