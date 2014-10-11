'use strict';

/**
 * @ngdoc factory
 * @name tscorerApp.AppSettings
 * @description Contains all the default data for a game of real tennis, excluding handicap caluculation data
 * # AppSettings
 * factory in the tscorerApp.
 */
angular.module('tscorerApp')
  .factory('AppSettings', function AppSettings() {

    var Settings = {};

    Settings.gameTypes = ["Singles", "Doubles"];
    Settings.games = [
      {
        shortlabel: "5",
        value: "5"
      },
      {
        shortlabel: "6",
        value: "6"
      },
      {
        shortlabel: "7",
        value: "7"
      },
      {
        shortlabel: "8",
        value: "8"
      },
      {
        shortlabel: "9",
        value: "9"
      },
      {
        shortlabel: "∞",
        value: "0"
      }
    ];
    Settings.sets = [1,3,5];

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

    Settings.getScoreLabel = function(score){
      return scoreNames[score];
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

    Settings.getScoreName = function(score) {
      return scores[score];
    };

    var scoreOrder = ["o3","o2","o1","l","r1","r2","r3"];

    Settings.getScoreOrder = function(advantage){
      if (advantage) {
        scoreOrder.push("ad");
      }
      return scoreOrder;
    };

    var hazardChases = [
      {
        key: "hone",
        label: "One yard",
        shortlabel: "1",
        choices: [
          {key: "hbhalf", name: "Better than half a yard", hazard: true},
          {key: "hhalf", name: "Half a yard", hazard: true},
          {key: "hbtone", name: "Better than one yard", hazard: true},
          {key: "hone", name: "One yard", hazard: true, primary: true, shortlabel: "1"},
          {key: "hwtone", name: "Worse than one yard", hazard: true},
          {key: "honetwo", name: "One and two", hazard: true},
        ]
      },
      {
        key: "htwo",
        label: "Two yards",
        shortlabel: "2",
        choices: [
          {key: "honetwo", name: "One and two", hazard: true},
          {key: "hbttwo", name: "Better than two yards", hazard: true},
          {key: "htwo", name: "Two yards", hazard: true, primary: true, shortlabel: "2"},
          {key: "hwttwo", name: "Worse than two yards", hazard: true},
          {key: "hhalfwttwo", name: "Half a yard worse than two", hazard: true}
        ]
      },
      {
        key: "hsecond",
        label: "Second Gallery",
        shortlabel: "2G",
        choices: [
          {key: "hhalfwttwo", name: "Half a yard worse than two", hazard: true},
          {key: "hbtsecond", name: "Better than second gallery", hazard: true},
          {key: "hsecond", name: "Second gallery", hazard: true, primary: true, shortlabel: "2G"},
          {key: "hwtsecond", name: "Worse than second gallery", hazard: true},
          {key: "hywtsecond", name: "A yard worse than second gallery", hazard: true}
        ]
      },
      {
        key: "hdoor",
        label: "The door",
        shortlabel: "D",
        choices: [
          {key: "hywtsecond", name: "A yard worse than second gallery", hazard: true},
          {key: "hbtdoor", name: "Better than the door", hazard: true},
          {key: "hdoor", name: "The door", hazard: true, primary: true, shortlabel: "D"},
          {key: "hwtdoor", name: "Worse than the door", hazard: true},
          {key: "hywtdoor", name: "A yard worse than the door", hazard: true}
        ]
      },
      {
        key: "hfirst",
        label: "First gallery",
        shortlabel: "1G",
        choices: [
          {key: "hywtdoor", name: "A yard worse than the door", hazard: true},
          {key: "hbtfirst", name: "Better than first gallery", hazard: true},
          {key: "hfirst", name: "First gallery", hazard: true, primary: true, shortlabel: "1G"},
          {key: "hline", name: "The Line", hazard: true}
        ]
      }

    ];

    var serviceChases = [
      {
        key: "first",
        label: "First gallery",
        shortlabel: "1G",
        choices: [
          {key: "line", name: "The Line"},
          {key: "first", name: "First gallery", primary: true, shortlabel: "1G"},
          {key: "btfirst", name: "Better than first gallery"},
          {key: "ywtdoor", name: "A yard worse than the door"}
        ]
      },
      {
        key: "door",
        label: "The door",
        shortlabel: "D",
        choices: [
          {key: "ywtdoor", name: "A yard worse than the door"},
          {key: "wtdoor", name: "Worse than the door"},
          {key: "door", name: "The door", primary: true, shortlabel: "D"},
          {key: "btdoor", name: "Better than the door"},
          {key: "ywtsecond", name: "A yard worse than second gallery"}
        ]
      },
      {
        key: "second",
        label: "Second gallery",
        shortlabel: "2G",
        choices: [
          {key: "ywtsecond", name: "A yard worse than second gallery"},
          {key: "wtsecond", name: "Worse than second gallery"},
          {key: "second", name: "Second gallery"},
          {key: "btsecond", name: "Better than second gallery"},
          {key: "ybtsecond", name: "A yard better than second gallery", primary: true, shortlabel: "2G"},
          {key: "mtywlast", name: "More than a yard worse than last gallery"},
          {key: "ywtlast", name: "A yard worse than last gallery"}
        ]
      },
      {
        key: "last",
        label: "Last gallery",
        shortlabel: "LG",
        choices: [
          {key: "ywtlast", name: "A yard worse than last gallery"},
          {key: "nywtlast", name: "Nearly a yard worse than last gallery"},
          {key: "hywtlast", name: "Half a yard worse than last gallery"},
          {key: "wtlast", name: "Worse than last gallery"},
          {key: "last", name: "Last gallery", primary: true, shortlabel: "LG"},
          {key: "btlast", name: "Better than last gallery"},
          {key: "halfwtsix", name: "Half a yard worse than six"}
        ]
      },
      {
        key: "six",
        label: "Six yards",
        shortlabel: "6",
        choices: [
          {key: "halfwtsix", name: "Half a yard worse than six"},
          {key: "wtsix", name: "Worse than six yards"},
          {key: "six", name: "Six yards", primary: true, shortlabel: "6"},
          {key: "btsix", name: "Better than six yards"},
          {key: "fivesix", name: "Five and six"}
        ]
      },
      {
        key: "five",
        label: "Five yards",
        shortlabel: "5",
        choices: [
          {key: "fivesix", name: "Five and six"},
          {key: "wtfive", name: "Worse than five yards"},
          {key: "five", name: "Five yards", primary: true, shortlabel: "5"},
          {key: "btfive", name: "Better than five yards"},
          {key: "fourfive", name: "Four and five"}
        ]
      },
      {
        key: "four",
        label: "Four yards",
        shortlabel: "4",
        choices: [
          {key: "fourfive", name: "Four and five"},
          {key: "wtfour", name: "Worse than four yards"},
          {key: "four", name: "Four yards", primary: true, shortlabel: "4"},
          {key: "btfour", name: "Better than four"},
          {key: "threefour", name: "Three and four"}
        ]
      },
      {
        key: "three",
        label: "Three yards",
        shortlabel: "3",
        choices: [
          {key: "threefour", name: "Three and four"},
          {key: "wtthree", name: "Worse than three yards"},
          {key: "three", name: "Three yards", primary: true, shortlabel: "3"},
          {key: "btthree", name: "Better than three yards"},
          {key: "twothree", name: "Two and Three"}
        ]
      },
      {
        key: "two",
        label: "Two yards",
        shortlabel: "2",
        choices: [
          {key: "twothree", name: "Two and Three"},
          {key: "wttwo", name: "Worse than two yards"},
          {key: "two", name: "Two yards", primary: true, shortlabel: "2"},
          {key: "bttwo", name: "Better than two yards"},
          {key: "onetwo", name: "One and two"}
        ]
      },
      {
        key: "one",
        label: "One yard",
        shortlabel: "1",
        choices: [
          {subkey: "onetwo", name: "One and two"},
          {subkey: "wtone", name: "Worse than one yard"},
          {subkey: "one", name: "One yard", primary: true, shortlabel: "1"},
          {subkey: "btone", name: "Better than one yard"},
          {subkey: "half", name: "Half a yard"},
          {subkey: "bhalf", name: "Better than half a yard"}
        ]
      }
    ];

    Settings.chases = {
      hazard: hazardChases,
      service: serviceChases
    };

    return Settings;
  });
