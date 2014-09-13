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

    var scores = {
      "l": "Love",
      "r1": "Fifteen",
      "r2": "Thirty",
      "r3": "Fourty",
      "ad": "Advantage",
      "g": "Game",
      "o1": "Owe Fifteen",
      "o2": "Owe Thirty",
      "o3": "Owe Forty"
    };

    var chases = {
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
    };

    return {
      gameTypes: gameTypes,
      games: gamesPerSet,
      sets: sets,
      scores: scores,
      chases: chases
    };
  });
