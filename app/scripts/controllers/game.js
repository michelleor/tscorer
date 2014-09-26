'use strict';

/**
 * @ngdoc function
 * @name tscorerApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the tscorerApp
 */
angular.module('tscorerApp')
  .controller('GameCtrl', [ '$scope', '$timeout', 'GameSettingsMock', 'AppSettings', '$aside', '$modal',
    function ( $scope, $timeout, GameSettings, AppSettings, $aside, $modal) {
      $scope.gamedata = {};
      $scope.gamedata.game = 0;
      $scope.gamedata.chases = [];
      $scope.gamedata.p1 = GameSettings.p1;
      $scope.gamedata.p2 = GameSettings.p2;
      $scope.gamedata.p1.sets = 0;
      $scope.gamedata.p2.sets = 0;
      $scope.gamedata.p1.games = 0;
      $scope.gamedata.p2.games = 0;
      $scope.gamedata.chases = [];
      $scope.gamedata.logs = [];
      $scope.appsettings = {};
      $scope.appsettings.chases = AppSettings.chases;
      $scope.gamedisplay = {};
      $scope.gamedisplay.showScorecard = false;
      $scope.gamedisplay.logclasses = "size1";

      if (GameSettings.p1.serving) {
        $scope.gamedata.server = "p1";
        $scope.gamedata.receiver = "p2";
      } else {
        $scope.gamedata.server = "p2";
        $scope.gamedata.receiver = "p1";

      }

      var chaseAside = $aside({
        scope: $scope,
        template: 'templates/chases.html',
        show: false
      });

      var chaseNotice = $modal({
        title: 'Change Ends',
        scope: $scope,
        animation: 'am-fade-and-slide-bottom',
        template: 'templates/chasenotice.html',
        placement: 'bottom',
        backdrop: 'static',
        show: false
      });

      var logEvent = function(actiontype, msg, playerid) {
        $scope.gamedata.logs.push ({
          action: actiontype,
          player: playerid,
          text: msg
        });
        //if (document.getElementById('logcard')){ //can't access this in tests
        //  $timeout (function(){
        //    document.getElementById('logcard').scrollTop = 10000; //TODO - make a directive
        //  },200);
        //}
      };

      var extendlog = function(actiontype, msg) {
        var lastentry = $scope.gamedata.logs[$scope.gamedata.logs.length-1] ;
        lastentry.text += ', ' + msg ;
        if (!lastentry.more) {
          lastentry.more = [];
        }
        lastentry.more.push(actiontype);
      };

      var initPoints = function(){
        $scope.gamedata.p1.points = $scope.gamedata.p1.hcSettings.startingScores[Math.floor($scope.gamedata.game/4)];
        $scope.gamedata.p2.points = $scope.gamedata.p2.hcSettings.startingScores[Math.floor($scope.gamedata.game/4)];
        $scope.gamedata.p1.pointslabel = AppSettings.scores[$scope.gamedata.p1.points];
        $scope.gamedata.p2.pointslabel = AppSettings.scores[$scope.gamedata.p2.points];
      };

      var awardGame = function(playerid){
        var player = $scope.gamedata[playerid];
        extendlog('game', 'Game to ' + player.name);
        player.games = player.games + 1;
        $scope.gamedata.notice = "Game" ;
        if (player.games === GameSettings.gamesPerSet){
          awardSet(playerid);
        }
        $scope.gamedata.game += 1;
        initPoints();
        $scope.gamedata.chases = [];
      };

      var awardSet = function(playerid){
        var player = $scope.gamedata[playerid];
        extendlog('set', 'Set to ' + player.name);
        player.sets = player.sets + 1;
        $scope.gamedata.notice = "Game and Set" ;
        if (player.sets === GameSettings.setsPerMatch) {
          awardMatch(playerid);
        }
        $scope.gamedata.p1.games = 0;
        $scope.gamedata.p2.games = 0;
      };

      var awardMatch = function(playerid){
        var player = $scope.gamedata[playerid];
        $scope.gamedata.notice = "Game, Set, Match" ;
        extendlog('match', 'Match to ' + player.name);
      };

      var alertChangeEnds = function () {
        var content = currentScore() + '<br>' ;
        content += getChaseDescription(0);  //must have at least one chase
        if ($scope.gamedata.chases.length === 2 ) {
          content += '<br>' ;
          content += getChaseDescription(1);
        }
        $scope.gamedata.chasenotice = content;
        chaseNotice.show();
      };

      var currentScore = function(playerid){
        var scorelabels = {};
        var scoretext = '';
        scorelabels.p1 = AppSettings.scoreNames[$scope.gamedata.p1.points];
        scorelabels.p2 = AppSettings.scoreNames[$scope.gamedata.p2.points];
        if ($scope.gamedata.p1.points === 'r3' && $scope.gamedata.p2.points === 'r3') {
          if (GameSettings.playAdvantage) {
            //one point wins the game
            scoretext = '40 all, game point';
          } else {
            //playing advantage games
            scoretext = 'Duece';
          }
        }
        if (!playerid) {
          playerid = getLeadingPlayer();
        }
        if (scorelabels.p1 === scorelabels.p2) {
          scoretext = scorelabels.p1 + " all";
        } else {
          if (playerid === 'p1') {
            scoretext = scorelabels.p1 + ' - ' + scorelabels.p2;
          } else {
            scoretext =  scorelabels.p2 + ' - ' + scorelabels.p1;
          }
        }
        return scoretext;
      };

      var getLeadingPlayer = function(){
        var leadingplayer = 'p1';
        var scoreOrder = AppSettings.getScoreOrder();
        var p1place = scoreOrder.indexOf($scope.gamedata.p1.points);
        var p2place = scoreOrder.indexOf($scope.gamedata.p2.points);
        if (p1place < p2place) {
          leadingplayer = 'p2' ;
        }
        return leadingplayer;
      };

      var swapServers = function(){
        var oldserver = $scope.gamedata.server;
        $scope.gamedata.server = $scope.gamedata.receiver;
        $scope.gamedata.receiver = oldserver;
        $scope.gamedata.p1.serving = $scope.gamedata.p2.serving;
        $scope.gamedata.p2.serving = !$scope.gamedata.p2.serving;
      };

      var getChaseDescription = function(idx){
        var desc = "Chase ";
        if ($scope.gamedata.chases[idx].hazard){
          desc = "Hazard chase ";
        }
        desc += $scope.gamedata.chases[idx].name;
        return desc;
      };

      $scope.awardPoint = function (playerid){
        //TODO - handle advantage
        var player, currentscore, scorelist, scorepos, txt, hazard = false;

        $scope.gamedata[$scope.gamedata.server].faults = 0;
        player = $scope.gamedata[playerid];

        currentscore = player.points ;
        scorelist = AppSettings.getScoreOrder();
        scorepos = scorelist.indexOf(currentscore);

        if ($scope.gamedata.playingchase) {
          hazard = $scope.gamedata.chases[0].hazard;
          $scope.gamedata.chases.splice(0,1);
          if ($scope.gamedata.chases.length === 0){
            $scope.gamedata.playingchase = false;
          }
          txt = "Chase won, ";
          if (( hazard && playerid === $scope.gamedata.receiver ) ||
            ( !hazard && playerid === $scope.gamedata.server ) ){
            txt = "Chase lost, ";
          }
          logEvent('score', txt + 'Point to ' + player.name, playerid);
        } else {
          logEvent('score', 'Point to ' + player.name, playerid);
        }
        if (scorepos+1 < scorelist.length) {
          player.points = scorelist[scorepos+1];
          player.pointslabel = AppSettings.scores[player.points];
          if (scorepos+2 === scorelist.length ){
            $scope.gamedata.isGamePoint = true;
            if ($scope.gamedata.chases.length > 0 && ! $scope.gamedata.playingchase){
              alertChangeEnds();
            }
          }
          if ($scope.gamedata.playingchase) {
            $scope.gamedata.notice = getChaseDescription(0);
          } else {
            $scope.gamedata.notice = currentScore(playerid) ;
          }
        } else {
          $scope.gamedata.isGamePoint = false;
          awardGame(playerid);
        }

        $scope.gamedisplay.showScorecard = false;

      };

      $scope.recoredFault = function(){
        var player, playerid;
        playerid = $scope.gamedata.server;
        player = $scope.gamedata[playerid];

        logEvent('fault', player.name + ' served a fault', playerid);

        $scope.gamedata.notice = '';
        if (player.hcSettings.serves === 1) {
          $scope.awardPoint(playerid);
        } else {
          if (player.faults && player.faults === 1) {
            $scope.awardPoint($scope.gamedata.receiver);
            $scope.gamedata.notice = 'Double ';
          } else {
            player.faults = 1;
          }
        }
        $scope.gamedisplay.showScorecard = false;
        $scope.gamedata.notice += 'Fault';
      };

      $scope.setChase = function(chase){
        $scope.gamedata.chases.push(angular.copy(chase));
        var chasemsg = 'Chase: ';
        if (chase.hazard) {
          chasemsg += 'Hazard chase ';
        }
        chasemsg += chase.name;

        logEvent('chase', chasemsg );
        $scope.gamedata.notice = 'Chase';
        chaseAside.hide();
        //todo - deal with one chase handicaps
        if ($scope.gamedata.chases.length === 2 || $scope.gamedata.isGamePoint ) {
          alertChangeEnds();
        }
      };

      $scope.showChases = function(hazardChases){
        $scope.gamedisplay.scrollChaseBox = ! hazardChases;
        $scope.gamedisplay.showHazard = hazardChases;
        $scope.gamedisplay.showScorecard = false;
        chaseAside.show();
      };

      $scope.changeEnds = function(){
        chaseNotice.hide();
        swapServers();
        $scope.gamedata.playingchase = true;
        $scope.gamedata.notice = getChaseDescription(0);
      };

      //do the setup
      logEvent('start','Match begins');
      initPoints();

    }]);
