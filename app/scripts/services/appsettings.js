'use strict';

/**
 * @ngdoc service
 * @name tscorerApp.AppSettings
 * @description Contains all the default data for a game of real tennis, excluding handicap caluculation data
 * # AppSettings
 * Service in the tscorerApp.
 */
angular.module('tscorerApp')
  .service('AppSettings', function AppSettings() {
    var gameTypes = ["Singles", "Doubles"];
    var gamesPerSet = [5,6,7,8,9];
    var sets = [1,3,5];

    var scoreNames = {
      "l": "Love",
      "r1": "Fifteen",
      "r2": "Thirty",
      "r3": "Fourty",
      "ad": "Advantage",
      "o1": "Owe Fifteen",
      "o2": "Owe Thirty",
      "o3": "Owe Forty"
    };

    var scores = {
      "o3": "-40",
      "o2": "-30",
      "o1": "-15",
      "l": "0",
      "r1": "15",
      "r2": "30",
      "r3": "40",
      "ad": "Ad",
    };

    var scoreOrder = ["o3","o2","o1","l","r1","r2","r3"];

    var getScoreOrder = function(advantage){
      if (advantage) {
        scoreOrder.push("ad");
      }
      return scoreOrder;
    };

    var chases = [
      {key: "hbhalf", name: "Better than half a yard", type: "space", size: "half" , hazard: true},
      {key: "hhalf", name: "Half a yard", type: "line", size: "half" , hazard: true},
      {key: "hbtone", name: "Better than one yard", type: "space", size: "half" , hazard: true},
      {key: "hone", name: "One yard", type: "line", size: "full", hazard: true},
      {key: "hwtone", name: "Worse than one yard", type: "space", size: "half", hazard: true},
      {key: "honetwo", name: "One and two", type: "line", size: "half", hazard: true},
      {key: "hbttwo", name: "Better than two yards", type: "space", size: "half", hazard: true},
      {key: "htwo", name: "Two Yards", type: "line", size: "full", hazard: true},
      {key: "hwttwo", name: "Worse than two yards", type: "space", size: "half", hazard: true},
      {key: "hhalfwttwo", name: "Half a yard worse than two", type: "line", size: "half", hazard: true},
      {key: "hbtsecond", name: "Better than second gallery", type: "space", size: "full", hazard: true},
      {key: "hsecond", name: "Second gallery", type: "line", size: "full", hazard: true},
      {key: "hwtsecond", name: "Worse than second gallery", type: "space", size: "full", hazard: true},
      {key: "hywtsecond", name: "A yard worse than second gallery", type: "line", size: "half", hazard: true},
      {key: "hbtdoor", name: "Better than the door", type: "space", size: "full", hazard: true},
      {key: "hdoor", name: "The door", type: "line", size: "full", hazard: true},
      {key: "hwtdoor", name: "Worse than the door", type: "space", size: "full", hazard: true},
      {key: "hywtdoor", name: "A yard worse than the door", type: "line", size: "half", hazard: true},
      {key: "hbtfirst", name: "Better than first gallery", type: "space", size: "full", hazard: true},
      {key: "hfirst", name: "First gallery", type: "line", size: "full", hazard: true},
      {key: "hline", name: "The Line", type: "space", size: "full", hazard: true},
      {key: "net", name: "net", type: "line", size: "half", noselect: true, extraclasses: "net"},
      {key: "line", name: "The Line", type: "space", size: "full"},
      {key: "first", name: "First gallery", type: "line", size: "full"},
      {key: "btfirst", name: "Better than first gallery", type: "space", size: "full"},
      {key: "ywtdoor", name: "A yard worse than the door", type: "line", size: "half"},
      {key: "wtdoor", name: "Worse than the door", type: "space", size: "full"},
      {key: "door", name: "The door", type: "line", size: "full"},
      {key: "btdoor", name: "Better than the door", type: "space", size: "full"},
      {key: "ywtsecond", name: "A yard worse than second gallery", type: "line", size: "half"},
      {key: "wtsecond", name: "Worse than second gallery", type: "space", size: "full"},
      {key: "second", name: "Second gallery", type: "line", size: "half", extraclasses: "blue"},
      {key: "btsecond", name: "Better than second gallery", type: "space", size: "full"},
      {key: "ybtsecond", name: "A yard better than second gallery", type: "line", size: "half"},
      {key: "mtywlast", name: "More than a yard worse than last gallery", type: "space", size: "full"},
      {key: "ywtlast", name: "A yard worse than last gallery", type: "line", size: "full"},
      {key: "nywtlast", name: "Nearly a yard worse than last gallery", type: "space", size: "half"},
      {key: "hywtlast", name: "Half a yard worse than last gallery", type: "line", size: "half"},
      {key: "wtlast", name: "Worse than last gallery", type: "space", size: "half"},
      {key: "last", name: "Last gallery", type: "line", size: "full", extraclasses: "blue"},
      {key: "btlast", name: "Better than last gallery", type: "space", size: "half"},
      {key: "halfwtsix", name: "Half a yard worse than six", type: "line", size: "half"},
      {key: "wtsix", name: "Worse than six yards", type: "space", size: "half"},
      {key: "six", name: "Six yards", type: "line", size: "half"},
      {key: "btsix", name: "Better than six yards", type: "space", size: "half"},
      {key: "fivesixe", name: "Five and six", type: "line", size: "half"},
      {key: "wtfive", name: "Worse than five yards", type: "space", size: "half"},
      {key: "five", name: "Five yards", type: "line", size: "full"},
      {key: "btfive", name: "Better than five yards", type: "space", size: "half"},
      {key: "fourfive", name: "Four and five", type: "line", size: "half"},
      {key: "wtfour", name: "Worse than four yards", type: "space", size: "half"},
      {key: "four", name: "Four yards", type: "line", size: "full"},
      {key: "btfour", name: "Better than four", type: "space", size: "half"},
      {key: "threefour", name: "Three and four", type: "line", size: "half"},
      {key: "wtthree", name: "Worse than three yards", type: "space", size: "half"},
      {key: "three", name: "Three yards", type: "line", size: "full"},
      {key: "btthree", name: "Better than three yards", type: "space", size: "half"},
      {key: "twothree", name: "Two and Three", type: "line", size: "half"},
      {key: "wttwo", name: "Worse than two yards", type: "space", size: "half"},
      {key: "two", name: "Two yards", type: "line", size: "full"},
      {key: "bttwo", name: "Better than two yards", type: "space", size: "half"},
      {key: "onetwo", name: "One and two", type: "line", size: "half"},
      {key: "wtone", name: "Worse than one yard", type: "space", size: "half"},
      {key: "one", name: "One yard", type: "line", size: "full"},
      {key: "btone", name: "Better than one yard", type: "space", size: "half" },
      {key: "half", name: "Half a yard", type: "line", size: "half" },
      {key: "bhalf", name: "Better than half a yard", type: "space", size: "half" }
    ];

    return {
      getScoreOrder: getScoreOrder,
      gameTypes: gameTypes,
      games: gamesPerSet,
      sets: sets,
      scores: scores,
      scoreNames: scoreNames,
      chases: chases
    };
  });
