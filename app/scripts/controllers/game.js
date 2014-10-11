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
    //['$scope', '$timeout', 'AppSettings', 'GameSettingsMock', 'History', 'Scoring', 'ngDialog',
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
      $scope.gamedata.lastactions = History.lastactions;
      $scope.gamedata.chases = Scoring.chases;
      $scope.scores = Scoring.scores;
      $scope.gamestate = Scoring.gamestate;

      // veiw state not shared with any service
      $scope.gamedisplay = {};
      $scope.gamedisplay.p1 = {}; //stores faults
      $scope.gamedisplay.p2 = {};
      $scope.gamedisplay.gameHasStarted = false;
      $scope.gamedisplay.gameHasEnded = false;
      $scope.gamedisplay.p1.showFault = false;
      $scope.gamedisplay.p2.showFault = false;

      //keep backups of state so user can undo
      var undoStack = [];

      var copyData = function copyKeys( target, source ) {
        if ( Array.isArray(source) ){
          //theoretically we should drill down through the array but for this app
          //there are no arrays at the level where the objects are linked to the services
          target.length = source.length; //just remove last chase if that is what we are undoing
        } else {
          Object.keys(source).forEach(function(key){
            if (typeof source[key] === 'object') {
              copyData(target[key], source[key]);
            } else {
              target[key] = source[key];
            }
          });
        }
      };

      $scope.undo = function undo(){
        var undoDescription = $scope.gamedata.lastactions[$scope.gamedata.lastactions.length-1];
        History.logUndo({text: undoDescription});

        //iterate through stack objects, but only copy primitives to maintain
        //object sharing between controller and service
        var undoData = undoStack[undoStack.length-1];
        copyData($scope.scores, undoData.scores);
        copyData($scope.gamestate, undoData.gamestate);
        copyData($scope.gamedisplay, undoData.gamedisplay);
        copyData($scope.gamedata, undoData.gamedata);
        //trim off last entry in array
        undoStack.length = undoStack.length-1;
        $scope.gamedata.lastactions.length = $scope.gamedata.lastactions.length-1;

      };

      var backup = function backup(){
        var undoData = {};
        undoData.gamedata = angular.copy($scope.gamedata);
        delete undoData.gamedata.logs;  //we won't revert the logs but will extend them
        delete undoData.gamedata.lastactions;  //don't backup or restore last actions list;
        undoData.scores = angular.copy($scope.scores);
        undoData.gamestate = angular.copy($scope.gamestate);
        undoData.gamedisplay = angular.copy($scope.gamedisplay);

        //check if there is already two in the array
        //if so, remove the first one
        if (undoStack.length === 2 ) {
          undoStack.splice(0,1);
        }

        //push the new one
        undoStack.push(undoData);
      };

      var changeEnds = function changeEnds() {
        //alert user, swap servers, record history
        //backup();
        $scope.chasedialog = {};
        $scope.chasedialog.score = Scoring.getCurrentScore();

        ngDialog.open({
          template: 'endsdialog.html' ,
          scope: $scope,
          className: 'ts-theme-default'
        });

        //swap servers
        Scoring.swapServers();

        History.logEnds({chase: $scope.gamedata.chases[0], chaseCount:$scope.gamedata.chases.length});

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
        } else if ($scope.gamedata.chases.length > 0  && $scope.gamestate.playingchase) {
          History.logSecondChase({chase: $scope.gamedata.chases[0]});
        }

      };


      $scope.awardPoint = function awardPoint(playerid){
        //update display state, work out new score
        //record the point and optionally change ends
        backup();

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
        backup();

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

        backup();
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

      //handle menu actions
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

      $scope.$on('undo', function showundo(){
        //$scope.gamedisplay.showUndo = true;
        ngDialog.open({
          template: 'undodialog.html' ,
          scope: $scope,
          className: 'ts-theme-default'
        });
      });
      //do the setup
      History.logEvent({evtype:"start",id: "0"});
      $scope.scores = Scoring.initGame();
      History.logNewGame({scores: $scope.scores, players: $scope.players});
    }
    // @if DEBUG
    //]
    // @endif
    );
