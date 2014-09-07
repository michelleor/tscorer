'use strict';

/**
 * @ngdoc service
 * @name tscorerApp.GameSettings
 * @description
 * # GameSettings
 * Service in the tscorerApp.
 */
angular.module('tscorerApp')
  .service('GameSettings', function GameSettings() {
    // AngularJS will instantiate a singleton by calling "new" on this function

    return {
        gameTypes: ["Singles", "Doubles"],
        gamesPerSet: [5,6,7,8,9],
        sets: [1,3,5],
        handicaps: {
          "Singles": {
            "0": {
              "receive": "love",
              "owe": "love"
            },
            "1": {
              "receive": "love",
              "owe": "owequater15"
            },
            "2": {
              "receive": "love",
              "owe": "owehalf15"
            },
            "3": {
              "receive": "rechalf15",
              "owe": "love"
            },
            "4": {
              "receive": "love",
              "owe": "owe15"
            },
            "5": {
              "receive": "rechalf15",
              "owe": "owehalf15a"
            },
            "6": {
              "receive": "rec15",
              "owe": "love"
            },
            "7": {
              "receive": "rechalf15",
              "owe": "owehalf15"
            },
            "8": {
              "receive": "rec15",
              "owe": "owehalf15"
            },
            "9": {
              "receive": "rechalf15",
              "owe": "owehalf30a"
            },
            "10": {
              "receive": "rec15",
              "owe": "owe15"
            },
            "11": {
              "receive": "rechalf15",
              "owe": "owe30"
            },
            "12": {
              "receive": "rec15",
              "owe": "owehalf30"
            },
            "13": {
              "receive": "rec15",
              "owe": "owe30"
            },
            "14": {
              "receive": "rechalf30",
              "owe": "owe15"
            },
            "15": {
              "receive": "rechalf30",
              "owe": "owehalf30a"
            },
            "16": {
              "receive": "rechalf30",
              "owe": "owe30"
            },
            "18": {
              "receive": "rec30",
              "owe": "owe15"
            },
            "20": {
              "receive": "rec30",
              "owe": "owehalf30"
            },
            "22": {
              "receive": "rec30",
              "owe": "owe30"
            },
            "24": {
              "receive": "rec30",
              "owe": "owe40"
            },
            "26": {
              "receive": "rec30",
              "owe": "owe15st"
            },
            "28": {
              "receive": "rec30",
              "owe": "owehalf30st"
            },
            "30": {
              "receive": "rec30",
              "owe": "owe30st"
            },
            "32": {
              "receive": "rec30",
              "owe": "owe40st"
            },
            "34": {
              "receive": "rec30",
              "owe": "owe15st34"
            },
            "36": {
              "receive": "rec30",
              "owe": "owehalf30st34"
            },
            "38": {
              "receive": "rec30",
              "owe": "owe30st34"
            },
            "40": {
              "receive": "rec30",
              "owe": "owe40st34"
            },
            "42": {
              "receive": "rec30",
              "owe": "owe30st3"
            },
            "44": {
              "receive": "rec30",
              "owe": "owe40st3"
            },
            "46": {
              "receive": "rec30",
              "owe": "owehalf30st23"
            },
            "48": {
              "receive": "rec30",
              "owe": "owe30st23"
            },
            "50": {
              "receive": "rec30",
              "owe": "owe40st23"
            }
          },
          "Doubles": {
            "0": {
              "receive": "love",
              "owe": "love"
            },
            "1": {
              "receive": "love",
              "owe": "owequater15"
            },
            "2": {
              "receive": "love",
              "owe": "owehalf15"
            },
            "4": {
              "receive": "rechalf15",
              "owe": "love"
            },
            "5": {
              "receive": "love",
              "owe": "owe15"
            },
            "6": {
              "receive": "rechalf15",
              "owe": "owehalf15a"
            },
            "7": {
              "receive": "rec15",
              "owe": "love"
            },
            "8": {
              "receive": "rechalf15",
              "owe": "owehalf15"
            },
            "9": {
              "receive": "rec15",
              "owe": "owehalf15"
            },
            "10": {
              "receive": "rechalf15",
              "owe": "owehalf30a"
            },
            "11": {
              "receive": "rec15",
              "owe": "owe15"
            },
            "12": {
              "receive": "rechalf15",
              "owe": "owe30"
            },
            "13": {
              "receive": "rec15",
              "owe": "owehalf30"
            },
            "14": {
              "receive": "rec15",
              "owe": "owe30"
            },
            "15": {
              "receive": "rechalf30",
              "owe": "owe15"
            },
            "17": {
              "receive": "rechalf30",
              "owe": "owehalf30a"
            },
            "19": {
              "receive": "rechalf30",
              "owe": "owe30"
            },
            "21": {
              "receive": "rec30",
              "owe": "owe15"
            },
            "23": {
              "receive": "rec30",
              "owe": "owehalf30"
            },
            "25": {
              "receive": "rec30",
              "owe": "owe30"
            },
            "27": {
              "receive": "rec30",
              "owe": "owe40"
            },
            "29": {
              "receive": "rec30",
              "owe": "owe15st"
            },
            "31": {
              "receive": "rec30",
              "owe": "owehalf30st"
            },
            "33": {
              "receive": "rec30",
              "owe": "owe30st"
            },
            "35": {
              "receive": "rec30",
              "owe": "owe40st"
            },
            "37": {
              "receive": "rec30",
              "owe": "owe15st34"
            },
            "40": {
              "receive": "rec30",
              "owe": "owehalf30st34"
            },
            "43": {
              "receive": "rec30",
              "owe": "owe30st34"
            },
            "46": {
              "receive": "rec30",
              "owe": "owe40st34"
            },
            "49": {
              "receive": "rec30",
              "owe": "owe30st3"
            },
            "52": {
              "receive": "rec30",
              "owe": "owe40st3"
            },
            "55": {
              "receive": "rec30",
              "owe": "owehalf30st23"
            },
            "58": {
              "receive": "rec30",
              "owe": "owe30st23"
            },
            "61": {
              "receive": "rec30",
              "owe": "owe40st23"
            }
          }
        },

        handicapDetails: {
          "love": {
            "description": "Love",
            "startingScores": ["l", "l", "l", "l"],
            "serves": 2
          },
          "rechalf15": {
            "description": "Receive half 15",
            "startingScores": ["l", "r1", "l", "r1"],
            "serves": 2
          },
          "rec15": {
            "description": "Receive 15",
            "startingScores": ["r1", "r1", "r1", "r1"],
            "serves": 2
          },
          "rechalf30": {
            "description": "Receive half 30",
            "startingScores": ["r1", "r2", "r1", "r2"],
            "serves": 2
          },
          "rec30": {
            "description": "Receive 30",
            "startingScores": ["r2", "r2", "r2", "r2"],
            "serves": 2
          },
          "owequater15": {
            "description": "Owe quarter 15",
            "startingScores": ["l", "l", "l", "o1"],
            "serves": 2
          },
          "owehalf15": {
            "description": "Owe half 15",
            "startingScores": ["l", "o1", "l", "o1"],
            "serves": 2
          },
          "owehalf15a": {
            "description": "Owe half 15",
            "startingScores": ["o1", "l", "o1", "l"],
            "serves": 2
          },
          "owe15": {
            "description": "Owe 15",
            "startingScores": ["o1", "o1", "o1", "o1"],
            "serves": 2
          },
          "owehalf30": {
            "description": "Owe half 30",
            "startingScores": ["o1", "o2", "o1", "o2"],
            "serves": 2
          },
          "owehalf30a": {
            "description": "Owe half 30",
            "startingScores": ["o2", "o1", "o2", "o1"],
            "serves": 2
          },
          "owe30": {
            "description": "Owe 30",
            "startingScores": ["o2", "o2", "o2", "o3"],
            "serves": 2
          },
          "owe40": {
            "description": "Owe 40",
            "startingScores": ["o3", "o3", "o3", "o3"],
            "serves": 2
          },
          "owe15st": {
            "description": "Owe 15 One serve and banned tambour",
            "startingScores": ["o1", "o1", "o1", "o1"],
            "serves": 1
          },
          "owehalf30st": {
            "description": "Owe half 30 One serve  banned tambour",
            "startingScores": ["o1", "o2", "o1", "o2"],
            "serves": 1
          },
          "owe30st": {
            "description": "Owe 30 One serve and banned tambour",
            "startingScores": ["o2", "o2", "o2", "o2"],
            "serves": 1
          },
          "owe40st": {
            "description": "Owe 40 One serve and banned tambour",
            "startingScores": ["o3", "o3", "o3", "o3"],
            "serves": 1
          },
          "owe15st34": {
            "description": "Owe 15  One serve and banned tambour and chases worse than 3 & 4. Banned hazard chases when playing off chases & Service End is conceded after one chase",
            "startingScores": ["o1", "o1", "o1", "o1"],
            "serves": 1,
            "chases": 3.5
          },
          "owehalf30st34": {
            "description": "Owe half 30  One serve and banned tambour and chases worse than 3 & 4. Banned hazard chases when playing off chases & Service End is conceded after one chase",
            "startingScores": ["o1", "o2", "o1", "o2"],
            "serves": 1,
            "chases": "threefour"
          },
          "owe30st34": {
            "description": "Owe 30  One serve and banned tambour and chases worse than 3 & 4. Banned hazard chases when playing off chases & Service End is conceded after one chase",
            "startingScores": ["o2", "o2", "o2", "o2"],
            "serves": 1,
            "chases": "threefour"
          },
          "owe40st34": {
            "description": "Owe 40  One serve and banned tambour and chases worse than 3 & 4. Banned hazard chases when playing off chases & Service End is conceded after one chase",
            "startingScores": ["o3", "o3", "o3", "o3"],
            "serves": 1,
            "chases": "threefour"
          },
          "owe30st3": {
            "description": "Owe 30  One serve and banned tambour and chases worse than 3.  Banned hazard chases when playing off chases & Service End is conceded after one chase",
            "startingScores": ["o2", "o2", "o2", "o2"],
            "serves": 1,
            "chases": "three"
          },
          "owe40st3": {
            "description": "Owe 40 One serve and banned tambour and chases worse than 3.  Banned hazard chases when playing off chases & Service End is conceded after one chase",
            "startingScores": ["o2", "o2", "o2", "o2"],
            "serves": 1,
            "chases": "three"
          },
          "owehalf30st23": {
            "description": "Owe half 30 One serve and banned tambour and banned chases worse than 2 & 3.  Banned hazard chases when playing off chases & Service End is conceded after one chase",
            "startingScores": ["o1", "o2", "o1", "o2"],
            "serves": 1,
            "chases": "twothree"
          },
          "owe30st23": {
            "descrtiption": "Owe 30 One serve and banned tambour and banned chases worse than 2 & 3.  Banned hazard chases when playing off chases & Service End is conceded after one chase",
            "startingScores": ["o2", "o2", "o2", "o2"],
            "serves": 1,
            "chases": "twothree"
          }
        },

        scores: {
          "l": "Love",
          "r1": "Fifteen",
          "r2": "Thirty",
          "r3": "Fourty",
          "ad": "Advantage",
          "g": "Game",
          "o1": "Owe Fifteen",
          "o2": "Owe Thirty",
          "o3": "Owe Forty"
        },

        chases: {
          "bhalf": "Better than half a yard",
          "half": "Half a yard",
          "btone": "Better than one yard",
          "one": "One yard",
          "wtone": "Worse than one yard",
          "onetwo": "One and two",
          "bttwo": "Better than two yards",
          "two": "Two Yards",
          "wttwo": "Worse than two yards",
          "twothree": "Two and Three",
          "btthree": "Better than three yards",
          "three": "Three yards",
          "wtthree": "Worse than three yards",
          "threefour": "Three and four",
          "btfour": "Better than four",
          "four": "Four yards",
          "wtfour": "Worse than four yards",
          "fourfive": "Four and five",
          "btfive": "Better than five yards",
          "fivesixe": "Five and six",
          "btsix": "Better than six yards",
          "six": "Six yards",
          "wtsix": "Worse than six yards",
          "halfwtsix": "Half a yard worse than six",
          "btlast": "Better than last gallery",
          "last": "Last gallery",
          "wtlast": "Worse than last gallery",
          "nywtlast": "Nearly a yard worse than last gallery",
          "ywtlast": "A yard worse than last gallery",
          "mtywlast": "More than a yard worse than last gallery",
          "ybtsecond": "A yard better than second gallery",
          "btsecond": "Better than second gallery",
          "second": "Second gallery",
          "wtsecond": "Worse than second gallery",
          "ywtsecond": "A yard worse than second gallery",
          "btdoor": "Better than the door",
          "door": "The door",
          "wtdoor": "Worse than the door",
          "btfirst": "Better than first gallery",
          "first": "First gallery",
          "line": "The Line"

        }
      };
  });
