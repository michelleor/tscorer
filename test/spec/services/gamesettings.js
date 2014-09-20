'use strict';

describe('Service: GameSettings', function () {

  // load the service's module
  beforeEach(module('tscorerApp'));

  // instantiate service
  var GameSettings;
  beforeEach(inject(function (_GameSettings_) {
    GameSettings = _GameSettings_;
  }));

  it('Contain placeholders for the data to be passed from setup to game play', function () {
    expect(GameSettings).toEqual({
      p1: {},
      p2: {},
      gameType: "",
      gamesPerSet: 0,
      setsPerMatch: 0
    });
  });


});
