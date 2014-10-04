'use strict';

/**
 * @ngdoc factory
 * @name tscorerApp.Scoring
 * @description
 *   All game logic for adding points, faults, chases, playing chases
 *   Keep current score state
 * # Scoring
 * Service in the tscorerApp.
 */
angular.module('tscorerApp')
  .factory('Scoring', ['GameSettingsMock', 'AppSettings', function Scoring(GameSettings, AppSettings) {
    
    var ScoreService = {};

    var scores = {};
    var players = {};
    var gamestate = {};
    var chases = [];

    players.p1 = GameSettings.currentgame.p1;
    players.p2 = GameSettings.currentgame.p2;
    scores.p1 = {
      sets: 0,
      games: 0,
      points: ""
    };
    scores.p2 = {
      sets: 0,
      games: 0,
      points: ""
    };

    gamestate.game = 0;
    gamestate.faults = 0;
    gamestate.playingchase = false;
    gamestate.gamepoint = false;

    if (players.p1.serving) {
      gamestate.server = "p1";
      gamestate.receiver = "p2";
    } else {
      gamestate.server = "p2";
      gamestate.receiver = "p1";
    }

    ScoreService.initGame = function initGame(){
      scores.p1.points = players.p1.hcSettings.startingScores[gamestate.game % 4];
      scores.p2.points = players.p2.hcSettings.startingScores[gamestate.game % 4];
      setPointLabels();
      return scores;
    };

    var setPointLabels = function setPointLabels() {
      scores.p1.pointname = AppSettings.getScoreName(scores.p1.points);
      scores.p1.pointlabel = AppSettings.getScoreLabel(scores.p1.points);
      scores.p2.pointname = AppSettings.getScoreName(scores.p2.points);
      scores.p2.pointlabel = AppSettings.getScoreLabel(scores.p2.points);
    };

    ScoreService.awardPoint = function awardPoint(id) {
      var currentpoints,
        pointslist,
        scorepos,
        //options = {},
        //txt,
        //hazard = false,
        awarded = {},
        awardgame = false,
        ends = false;


      currentpoints = scores[id].points ;
      pointslist = AppSettings.getScoreOrder(); //TODO add boolean param if playing duece
      scorepos = pointslist.indexOf(scores[id].points);

      //clear any fault
      gamestate.faults = 0;

      //first, clear the chase if we were playing one
      if (gamestate.playingchase) {
        //options.playingchase = true;
        //hazard = chases[0].hazard;
        chases.splice(0,1);  //remove first chase
        if (chases.length === 0){  //no more chases
          gamestate.playingchase = false;
        }
        //options.chasewon = true;
        //txt = "Chase won";
        //if (( hazard && playerid === $scope.gamedata.receiver ) ||
        //  ( !hazard && playerid === $scope.gamedata.server ) ){
        //  options.chasewon = false;
        //  txt = "Chase lost";
        //}
        //$scope.gamedata.notice = txt;
        //if ($scope.gamedata.playingchase) {
        //  $scope.gamedata.notice += ". Second chase";
        //}
      } else {
        //$scope.gamedata.notice = "Point to " + player.name ;
      }

      //if this player is at at game point, award the game
      if (currentpoints === pointslist[pointslist.length-1]) {
        gamestate.gamepoint = false;
        awardgame = true;
      } else {
        scorepos ++;
        scores[id].points = pointslist[scorepos]; //increment point key
        if (scorepos+1 === pointslist.length ){  //at game point after increment
          gamestate.gamepoint = true;
          if (chases.length > 0 && ! gamestate.playingchase){
            ends = true;
          }
        }
      }

      if (awardgame) {
        awarded = awardGame(id);
      }

      if (ends) {
        //changeEnds();
        awarded.ends = true;
      }

      setPointLabels();
      return awarded; //potentially return history options
    };

    var awardGame = function awardGame(id){
      var awarded = {};

      scores[id].games = scores[id].games + 1;
      if (scores[id].games === Number(GameSettings.currentgame.gamesPerSet)){
        awarded = awardSet(id);
        gamestate.game = 0;
      } else {
        gamestate.game += 1;
      }
      awarded.game = true;

      ScoreService.initGame();

      return awarded;
    };

    var awardSet = function awardSet(id){
      var awarded = {};
      scores[id].sets = scores[id].sets + 1;
 
      if (scores[id].sets === Number(GameSettings.currentgame.setsPerMatch)){
        awarded = awardMatch(id);
      }
      awarded.set = true;

      scores.p1.games = 0;
      scores.p2.games = 0;

      return awarded;
    };

    var awardMatch = function awardMatch(){
      var awarded = {};
      //$scope.gamedata.notice += ", Match" ;
      //History.logEvent('match', playerid, $scope.gamedata[playerid]);
      //$scope.gamedata.gameHasEnded = true;
      awarded.match = true;
      return awarded;
    };

    ScoreService.recordFault = function recordFault(){
      var id = gamestate.server,
        awarded = {};

      if (players[id].hcSettings.serves === 1) {
        awarded = ScoreService.awardPoint(gamestate.receiver);
        awarded.point = true;
      } else {
        if (gamestate.faults === 1) {
          awarded = ScoreService.awardPoint(gamestate.receiver);
          awarded.point = true;
        } else {
          gamestate.faults = 1;
        }
      }

      awarded.fault = true;
      return awarded;
    };

    ScoreService.recordChase = function recordChase(chase){
      var actions = {};
      var chasenum = chases.length;

      chases.push(angular.copy(chase));
      chases[chasenum].description = chase.name;
      if (chase.hazard) {
        chases[chasenum].description = "Hazard chase " + chase.name.toLowerCase();
      }

      //todo - deal with one chase handicaps
      if (chases.length === 2 || gamestate.gamepoint ){
        actions.ends = true;
      }

      return actions;

    };

    ScoreService.getCurrentScore = function getCurrentScore(shortscore) {
      //human friendly version of the score
      var scorelabels = {},
        playertxt = '',
        scoretext = '',
        pid = '';

      if (shortscore) {
        scorelabels.p1 = AppSettings.getScoreName(scores.p1.points);
        scorelabels.p2 = AppSettings.getScoreName(scores.p2.points);
      } else {
        scorelabels.p1 = AppSettings.getScoreLabel(scores.p1.points);
        scorelabels.p2 = AppSettings.getScoreLabel(scores.p2.points);
      }

      if (scores.p1.points === 'r3' && scores.p2.points === 'r3') {
        //both at receive 40
        if (GameSettings.currentgame.playAdvantage) {
          //one point wins the game
          scoretext = '40 all, game point';
        } else {
          //playing advantage games
          scoretext = 'Duece';
        }
      }
        
      pid = getLeadingPlayer();
      //if (pid !== '' && !shortscore) {
      //  playertxt = GameSettings.currentgame[pid].name;
      //}

      if (scorelabels.p1 === scorelabels.p2 ) {
        scoretext = scorelabels.p1 + " all";
      } else {
        if (pid === 'p1') {
          scoretext = scorelabels.p1 + ' - ' + scorelabels.p2 + playertxt;
        } else {
          scoretext =  scorelabels.p2 + ' - ' + scorelabels.p1 + playertxt;
        }
      }
      return scoretext;
    };

    var getLeadingPlayer = function getLeadingPlayer(){
      var leadingplayer = 'p1';
      var scoreOrder = AppSettings.getScoreOrder();
      var p1place = scoreOrder.indexOf(scores.p1.points);
      var p2place = scoreOrder.indexOf(scores.p2.points);
      if (p1place === p2place) {
        leadingplayer = '';
      } else if (p1place < p2place) {
        leadingplayer = 'p2' ;
      }
      return leadingplayer;
    };

    ScoreService.swapServers = function swapServers(){
      var oldserver = gamestate.server;
      gamestate.server = gamestate.receiver;
      gamestate.receiver = oldserver;
      if ( chases.length > 0 ) {
        gamestate.playingchase = true;
      }
    };

    ScoreService.scores = scores;
    ScoreService.players = players;
    ScoreService.gamestate = gamestate;
    ScoreService.chases = chases;

    return ScoreService;

  }]);
