'use strict';

describe('Service: Handicaps', function () {

  // load the service's module
  beforeEach(module('tscorerApp'));

  // instantiate service
  var Handicaps;
  beforeEach(inject(function (_Handicaps_) {
    Handicaps = _Handicaps_;
  }));

  it('calculate correct handicaps for equal handicaps in singles matches', function () {
    //equal scores
    expect(Handicaps.calculateHandicaps(50,50,'Singles')).toEqual({
      p1: {
        "key":"love",
        "description": "Love",
        "startingScores": ["l", "l", "l", "l"],
        "serves": 2
      },
      p2: {
        "key":"love",
        "description": "Love",
        "startingScores": ["l", "l", "l", "l"],
        "serves": 2
      },
      message: ""
    });
  });

  it('calculate correct handicaps for a difference of two', function () {
    //simple owing
    expect(Handicaps.calculateHandicaps(50,52,'Singles')).toEqual({
      p1: {
        "key":"owehalf15",
        "description": "Owe half 15",
        "startingScores": ["l", "o1", "l", "o1"],
        "serves": 2
      },
      p2: {
        "key":"love",
        "description": "Love",
        "startingScores": ["l", "l", "l", "l"],
        "serves": 2
      },
      message: ""
    });
  });

  it('calculate correct handicaps when the owing player is reversed', function () {
    expect(Handicaps.calculateHandicaps(52,50,'Singles')).toEqual({
      p2: {
        "key":"owehalf15",
        "description": "Owe half 15",
        "startingScores": ["l", "o1", "l", "o1"],
        "serves": 2
      },
      p1: {
        "key":"love",
        "description": "Love",
        "startingScores": ["l", "l", "l", "l"],
        "serves": 2
      },
      message: ""
    });
  });

  it('calculate correct handicaps for doubles', function () {
    expect(Handicaps.calculateHandicaps(54,50,'Doubles')).toEqual({
      p1: {
        "key":"rechalf15",
        "description": "Receive half 15",
        "startingScores": ["l", "r1", "l", "r1"],
        "serves": 2
      },
      p2: {
        "key":"love",
        "description": "Love",
        "startingScores": ["l", "l", "l", "l"],
        "serves": 2
      },
      message: ""
    });
  });

  it('calculate correct handicaps when the difference is not in the list', function () {
    expect(Handicaps.calculateHandicaps(50,53,'Doubles')).toEqual({
      p1: {
        "key":"owehalf15",
        "description": "Owe half 15",
        "startingScores": ["l", "o1", "l", "o1"],
        "serves": 2
      },
      p2: {
        "key":"love",
        "description": "Love",
        "startingScores": ["l", "l", "l", "l"],
        "serves": 2
      },
      message: ""
    });
  });

  it('calculate presents the correct message when the maximum is exceeded for singles', function () {
    expect(Handicaps.calculateHandicaps(60,5,'Singles')).toEqual({
      message: "Maximum handicap difference for Singles is 50"
    });
  });

  it('calculate presents the correct message when the maximum is exceeded for doubles', function () {
    expect(Handicaps.calculateHandicaps(70,5,'Doubles')).toEqual({
      message: "Maximum handicap difference for Doubles is 61"
    });
  });
});

