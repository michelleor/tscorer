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
    var gamesPerSet = [
      {
        label: "5",
        value: "5"
      },
      {
        label: "6",
        value: "6"
      },
      {
        label: "7",
        value: "7"
      },
      {
        label: "8",
        value: "8"
      },
      {
        label: "9",
        value: "9"
      },
      {
        label: "No limit",
        value: "0"
      }
    ];
    var sets = [0,1,3,5];

    var scoreNames = {
      "l": "Love",
      "r1": "Fifteen",
      "r2": "Thirty",
      "r3": "Forty",
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

    var hazardChases = [
      {
        key: "hone",
        label: "1",
        choices: [
          {key: "hbhalf", name: "Better than half a yard", hazard: true},
          {key: "hhalf", name: "Half a yard", hazard: true},
          {key: "hbtone", name: "Better than one yard", hazard: true},
          {key: "hone", name: "One yard", hazard: true},
          {key: "hwtone", name: "Worse than one yard", hazard: true},
          {key: "honetwo", name: "One and two", hazard: true},
        ]
      },
      {
        key: "htwo",
        label: "2",
        choices: [
          {key: "honetwo", name: "One and two", hazard: true},
          {key: "hbttwo", name: "Better than two yards", hazard: true},
          {key: "htwo", name: "Two yards", hazard: true},
          {key: "hwttwo", name: "Worse than two yards", hazard: true},
          {key: "hhalfwttwo", name: "Half a yard worse than two", hazard: true}
        ]
      },
      {
        key: "hsecond",
        label: "Second Gallery",
        choices: [
          {key: "hhalfwttwo", name: "Half a yard worse than two", hazard: true},
          {key: "hbtsecond", name: "Better than second gallery", hazard: true},
          {key: "hsecond", name: "Second gallery", hazard: true},
          {key: "hwtsecond", name: "Worse than second gallery", hazard: true},
          {key: "hywtsecond", name: "A yard worse than second gallery", hazard: true}
        ]
      },
      {
        key: "hdoor",
        label: "The door",
        choices: [
          {key: "hywtsecond", name: "A yard worse than second gallery", hazard: true},
          {key: "hbtdoor", name: "Better than the door", hazard: true},
          {key: "hdoor", name: "The door", hazard: true},
          {key: "hwtdoor", name: "Worse than the door", hazard: true},
          {key: "hywtdoor", name: "A yard worse than the door", hazard: true}
        ]
      },
      {
        key: "hfirst",
        label: "First gallery",
        choices: [
          {key: "hywtdoor", name: "A yard worse than the door", hazard: true},
          {key: "hbtfirst", name: "Better than first gallery", hazard: true},
          {key: "hfirst", name: "First gallery", hazard: true},
          {key: "hline", name: "Chase the Line", hazard: true}
        ]
      }

    ];

    var serviceChases = [
      {
        key: "first",
        label: "First gallery",
        choices: [
          {key: "line", name: "The Line"},
          {key: "first", name: "First gallery"},
          {key: "btfirst", name: "Better than first gallery"},
          {key: "ywtdoor", name: "A yard worse than the door"}
        ]
      },
      {
        key: "door",
        label: "The door",
        choices: [
          {key: "ywtdoor", name: "A yard worse than the door"},
          {key: "wtdoor", name: "Worse than the door"},
          {key: "door", name: "The door"},
          {key: "btdoor", name: "Better than the door"},
          {key: "ywtsecond", name: "A yard worse than second gallery"}
        ]
      },
      {
        key: "second",
        label: "Second galery",
        choices: [
          {key: "ywtsecond", name: "A yard worse than second gallery"},
          {key: "wtsecond", name: "Worse than second gallery"},
          {key: "second", name: "Second gallery"},
          {key: "btsecond", name: "Better than second gallery"},
          {key: "ybtsecond", name: "A yard better than second gallery"},
          {key: "mtywlast", name: "More than a yard worse than last gallery"},
          {key: "ywtlast", name: "A yard worse than last gallery"}
        ]
      },
      {
        key: "last",
        label: "Last gallery",
        choices: [
          {key: "ybtsecond", name: "A yard better than second gallery"},
          {key: "mtywlast", name: "More than a yard worse than last gallery"},
          {key: "ywtlast", name: "A yard worse than last gallery"},
          {key: "nywtlast", name: "Nearly a yard worse than last gallery"},
          {key: "hywtlast", name: "Half a yard worse than last gallery"},
          {key: "wtlast", name: "Worse than last gallery"},
          {key: "last", name: "Last gallery"},
          {key: "btlast", name: "Better than last gallery"},
          {key: "halfwtsix", name: "Half a yard worse than six"}
        ]
      },
      {
        key: "six",
        label: "6",
        choices: [
          {key: "halfwtsix", name: "Half a yard worse than six"},
          {key: "wtsix", name: "Worse than six yards"},
          {key: "six", name: "Six yards"},
          {key: "btsix", name: "Better than six yards"},
          {key: "fivesix", name: "Five and six"}
        ]
      },
      {
        key: "five",
        label: "5",
        choices: [
          {key: "fivesix", name: "Five and six"},
          {key: "wtfive", name: "Worse than five yards"},
          {key: "five", name: "Five yards"},
          {key: "btfive", name: "Better than five yards"},
          {key: "fourfive", name: "Four and five"}
        ]
      },
      {
        key: "four",
        label: "4",
        choices: [
          {key: "fourfive", name: "Four and five"},
          {key: "wtfour", name: "Worse than four yards"},
          {key: "four", name: "Four yards"},
          {key: "btfour", name: "Better than four"},
          {key: "threefour", name: "Three and four"}
        ]
      },
      {
        key: "three",
        label: "3",
        choices: [
          {key: "threefour", name: "Three and four"},
          {key: "wtthree", name: "Worse than three yards"},
          {key: "three", name: "Three yards"},
          {key: "btthree", name: "Better than three yards"},
          {key: "twothree", name: "Two and Three"}
        ]
      },
      {
        key: "two",
        label: "2",
        choices: [
          {key: "twothree", name: "Two and Three"},
          {key: "wttwo", name: "Worse than two yards"},
          {key: "two", name: "Two yards"},
          {key: "bttwo", name: "Better than two yards"},
          {key: "onetwo", name: "One and two"}
        ]
      },
      {
        key: "one",
        label: "1",
        choices: [
          {subkey: "onetwo", name: "One and two"},
          {subkey: "wtone", name: "Worse than one yard"},
          {subkey: "one", name: "One yard"},
          {subkey: "btone", name: "Better than one yard"},
          {subkey: "half", name: "Half a yard"},
          {subkey: "bhalf", name: "Better than half a yard"}
        ]
      }
    ];

    var chases = {
      hazard: hazardChases,
      service: serviceChases
    };

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
