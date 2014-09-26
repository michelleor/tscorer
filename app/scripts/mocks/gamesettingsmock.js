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
    var p1 = {
      "serving":true,
      "name":"Michelle",
      "hc":64,
      "hcSettings":{
        "description":"Receive 15",
        "startingScores":["r1","r1","r1","r1"],
        "serves":2,
        "key":"rec15"
      }
    };

    var p2 = {
      "name":"Evelyn",
      "hc":54,
      "hcSettings":{
        "description":"Owe 15",
        "startingScores":["o1","o1","o1","o1"],
        "serves":2,
        "key":"owe15"
      }
    };

    return {
      p1: p1,
      p2: p2,
      gameType: "Singles",
      gamesPerSet: 6,
      setsPerMatch: 1,
      handicap: true,
      playAdvantage: true
    };
  });
