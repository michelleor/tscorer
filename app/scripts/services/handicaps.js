'use strict';

/**
 * @ngdoc service
 * @name tscorerApp.Handicaps
 * @description Stores handicap settings and calculates handicaps
 * # Handicaps
 * Service in the tscorerApp.
 */
angular.module('tscorerApp')
	.service('Handicaps', [ function Handicaps() {
		// AngularJS will instantiate a singleton by calling "new" on this function

		var calculateHandicaps = function(h1, h2, gametype){
      //todo ..  manage numbers not integers
			var diff,
				result = {}
       ;

			result.message = "";

			if (Number(h1) && Number(h2)){
				diff = Math.round(Math.abs(h1-h2)); //compute difference first, then round to integer
				if (diff > maxdiff[gametype]) {
					result.message = "Maximum handicap difference for " + gametype + " is " + maxdiff[gametype];
				} else {
          var hc, p1Obj, p2Obj, key1, key2;
					//hc = handicaps[gametype][diff.toString()];
					hc = getHc(gametype, diff);
          if (Number(h1) >= Number(h2)) {
            key1 = "receive";
            key2 = "owe";
          } else {
            key1 = "owe";
            key2 = "receive";
          }
					p1Obj = handicapDetails[hc[key1]];
          p1Obj.key = hc[key1];
					p2Obj = handicapDetails[hc[key2]];
          p2Obj.key = hc[key2];

					result.p1 = p1Obj;
					result.p2 = p2Obj;
					result.message = "";

				}
			} else {
				result.message = "Please enter numbers in the handicap fields";
			}
			return result;
		};

		var getHc = function( gametype, diff ) {
			var result;

			while (!result){
				result = handicaps[gametype][diff.toString()];
				diff = diff - 1;
			}

			return angular.copy(result);

		};

    var maxdiff = {
      "Singles": 50,
      "Doubles": 61
    };
    var handicaps = {
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
    };

    var handicapDetails = {
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
    };

		return {
			calculateHandicaps: calculateHandicaps
		};
  }]);
