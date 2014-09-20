'use strict';

describe('Controller: GameCtrl', function () {

  // load the controller's module
  beforeEach(module('tscorerApp'));
  beforeEach(module('tscorerAppMocks'));//known state of handicap data for testing

  var scope, GameCtrl, gamesettings;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($rootScope, $controller, $injector) {
    gamesettings = $injector.get('GameSettingsMock');
    scope = $rootScope.$new();
    GameCtrl = $controller('GameCtrl', {
      $scope: scope,
      GameSettings: gamesettings
    });
  }));

  it('should define player / pair 1 and set the serving flag', function () {
    expect(scope.gamedata.p1.serving).toEqual(true);
  });

  it('should define player / pair 2', function () {
    expect(scope.gamedata.p1.hcSettings).toEqual(jasmine.any(Object));
  });

  it('should not set the serving flag player / pair 2', function () {
    expect(scope.gamedata.p2.serving).not.toBeDefined();
  });

  it('should start with one entry in the log', function(){
    expect(scope.gamedata.logs.length).toEqual(1);
    expect(scope.gamedata.logs[0].text).toEqual("Match begins");
  });

  it('logging function should add to logs array', function () {
    logEvent("test","test text", "p1");
    expect(scope.gamedata.logs[1]).toEqual({
      action: "test",
      player: "p1",
      text: "test text"
    });
  });

  it('should increment the point score', function () {
    scope.gamedata.p1.points = "o2";
    scope.awardPoint("p1");
    expect(scope.gamedata.p1.points).toEqual("o1");
    expect(scope.gamedata.p1.pointslabel).toEqual("-15");
    scope.awardPoint("p1");
    expect(scope.gamedata.p1.points).toEqual("l");
  });

  it('should award a game after 40 when handicap is on', function(){
    scope.gamedata.p1.points = "r3";
    scope.gamedata.p1.games = 0;
    scope.awardPoint("p1");
    expect(scope.gamedata.p1.points).toEqual("r1");//based on GameSettingsMock
    expect(scope.gamedata.p1.games).toEqual(1);
  });

  it('should award a set if games per set is reached', function(){
    gamesettings.p1 = {
      "hcSettings":{
        "startingScores":["r1","r1","r1","r1"]
      }
    };
    scope.gamedata.p1.points = "r3";
    scope.gamedata.p1.games = 5;
    scope.gamedata.p1.sets = 0;
    scope.awardPoint("p1");
    expect(scope.gamedata.p1.points).toEqual("r1");
    expect(scope.gamedata.p1.sets).toEqual(1);  //GamesSettingsMock = 6 games per set
    expect(scope.gamedata.p1.games).toEqual(0);
  });

  it('should set the correct starting scores after each game', function(){
    gamesettings.p1 = {
      "hcSettings":{
        "startingScores":["l","r1","l","r1"]
      }
    };

    gamesettings.p2 = {
      "hcSettings":{
        "description":"Owe 15",
        "startingScores":["o1","l","o1","l"]
      }
    };
  });
 

});
