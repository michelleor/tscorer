'use strict';

/**
 * @ngdoc function
 * @name tscorerApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the tscorerApp
 */
angular.module('tscorerApp')
  .controller('GameCtrl',
    // @if DEBUG
    ['$scope', '$timeout', 'AppSettings', 'GameSettingsMock', 'History', 'Scoring', 'ngDialog',
    // @endif
    function ( $scope, $timeout,  AppSettings, GameSettings, History, Scoring, ngDialog) {
      $scope.gamedata = {};
      $scope.players = {};
      $scope.appsettings = {};

      //static data
      $scope.players.p1 = GameSettings.currentgame.p1.name;
      $scope.players.p2 = GameSettings.currentgame.p2.name;
      $scope.displaysettings = GameSettings.getdisplaySettings();
      $scope.appsettings.chases = AppSettings.chases;

      //updated in services, required for display in view
      $scope.gamedata.logs = History.logs;
      $scope.gamedata.notice = History.notice;
      $scope.gamedata.chases = Scoring.chases;
      $scope.scores = Scoring.scores;
      $scope.gamestate = Scoring.gamestate;

      // veiw state not shared with any service
      $scope.gamedisplay = {};
      $scope.gamedisplay.p1 = {}; //stores faults
      $scope.gamedisplay.p2 = {};
      $scope.gamedisplay.gameHasStarted = false;
      $scope.gamedisplay.gameHasEnded = false;


      var changeEnds = function changeEnds() {
        //alert user, swap servers, record history

        $scope.chasedialog = {};
        $scope.chasedialog.score = Scoring.getCurrentScore();

        ngDialog.open({
          template: 'endsdialog.html' ,
          scope: $scope,
          className: 'ts-theme-default'
        });

        //swap servers
        Scoring.swapServers();

        History.logEnds({chase: $scope.gamedata.chases[0]});

      };

      var logPoint = function logPoint(details){
        //log winning a point, optionally log winning a game or playing off a chase
        var params = {
          id: details.id,
          scores: $scope.scores,
          playername: $scope.players[details.id],
          actions: details.events,
          extend: details.extend || false
        };

        History.logPoint(params);

        if ((details.events.game || details.events.set ) && !details.events.match ) {
          History.logNewGame({scores: $scope.scores, players: $scope.players});
        } else if ($scope.gamedata.chases.length > 0 ) {
          History.logSecondChase({chase: $scope.gamedata.chases[0]});
        }

      };


      $scope.awardPoint = function awardPoint(playerid){
        //update display state, work out new score
        //record the point and optionally change ends
        $scope.gamedisplay.gameHasStarted = true;
        $scope.gamedisplay.p1.showFault = false;
        $scope.gamedisplay.p2.showFault = false;

        var updates = Scoring.awardPoint(playerid);

        logPoint({id:playerid, events:updates});

        if (updates.match ) {
          $scope.gamedisplay.gameHasEnded = true;
        } else if (updates.ends) {
          changeEnds();
        }

      };

      $scope.recordFault = function recordFault(){
        //update display state, record the fault (which may also record a point)
        //log the fault and optionally log the point

        $scope.gamedisplay.gameHasStarted = true;
        $scope.gamedisplay.p1.showFault = false;
        $scope.gamedisplay.p2.showFault = false;

        var updates = Scoring.recordFault();

        if ($scope.gamestate.faults === 1) {
          $scope.gamedisplay[$scope.gamestate.server].showFault = true;
        }

        History.logFault({
          id: $scope.gamestate.server,
          scores: $scope.scores,
          actions: updates
        });
        if (updates.point) {
          logPoint({
            id:$scope.gamestate.server,
            events:updates,
            extend:true
          });
        }

      };

      $scope.setChase = function setChase(chase){
        //update display state
        //add the chase to the chases array - also works out if change of ends is required
        //record the chase in the history
        //change ends if required

        $scope.gamedisplay.showChases = false;

        var updates = Scoring.recordChase(chase);

        History.logChase({
          id: $scope.gamestate.server,
          scores: $scope.scores,
          chase: chase
        });

        if (updates.ends) {
          changeEnds();
        }

      };

      $scope.showChases = function showChases(hazardChases){
        //display level 1 of chase in slide-out panel

        //get a clean set of chase data so display state from previous attempt is cleared
        if (hazardChases){
          $scope.gamedisplay.chases = angular.copy($scope.appsettings.chases.hazard);
        } else {
          $scope.gamedisplay.chases = angular.copy($scope.appsettings.chases.service);
        }
        $scope.gamedisplay.showChases = true;
      };

      $scope.showChaseChoices = function showChaseChoices(chase) {
        //display level 2 of chase panel
        //hide any other level 2 options that were previously displayed.
        $scope.gamedisplay.chases.forEach(function(item){
          item.showchoices = false;
        });
        chase.showchoices = true;
      };

      $scope.$on('showhistory',function showhistory(){
        $scope.gamedisplay.showHistory = true;
        $scope.gamedisplay.showChases = false;
        $scope.gamedisplay.showSettings = false;
      });

      $scope.$on('showsettings', function showsettings(){
        $scope.gamedisplay.showSettings = true;
        $scope.gamedisplay.showHistory = false;
        $scope.gamedisplay.showChases = false;
      });

      //do the setup
      History.logEvent({evtype:"start",id: "0"});
      $scope.scores = Scoring.initGame();
      History.logNewGame({scores: $scope.scores, players: $scope.players});
    }
    // @if DEBUG
    ]
    // @endif
    );
