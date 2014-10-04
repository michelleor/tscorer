'use strict';

/**
 * @ngdoc factory
 * @name tscorerApp.History
 * @description - keeps a log of all events that have taken place
 * # History
 * Service in the tscorerApp.
 */
angular.module('tscorerApp')
  .factory('History', function History() {
    var HistoryService = {};

    HistoryService.logs = [];
    HistoryService.notice = {
      text: '',
      evt: ''
    };

    var strings = {
      start: "Match Begins"
    };

    HistoryService.logEvent = function( paramobj ) {

      //etype

      var text, etype = paramobj.evtype;

      text = strings[etype];

      HistoryService.logs.push ({
        action: etype,
        player: "0",
        text: text,
        scoretext: '',
        scores: {},
        extend: false
      });

      HistoryService.notice.evt = etype;
      HistoryService.notice.text = text;
      /*var showscore = false,
        msg = "",
        strkey;

      if (etype === "score") {
        showscore = true;
      }

      if ( playingchase) {
        if (chasewon) {
          msg = "Chase won, ";
        } else {
          msg = "Chase lost, ";
        }
      }

      strkey = etype;
      if (etype === "chase" && chaseobj.hazard) {
        strkey = "hchase";
      }

      msg += strings[strkey] ;

      if (etype === "chase" && chaseobj.discription) {
        msg += chaseobj.discription;
      }

      if (etype === "init"  ){
        //msg += options.name1 + ": " + options.score1 + ", " + options.name2 + ": " + options.score2;
      }
      */



      //msg = msg.replace("playername" , playername);

      //if (etype === "game" || etype === "set" || etype === "match") {
      //  extendlog( etype, msg );
      //} else {

      //}

    };

    HistoryService.logNewGame = function logNewGame( params) {
      //params:  players, scores
      var text = "Game Starts - " + params.players.p1 + ": " + params.scores.p1.pointlabel + ", " +
          params.players.p2 + ": " + params.scores.p2.pointlabel;

      HistoryService.logs.push ({
        action: "init",
        player: "0",
        text: text ,
        scoretext: '',
        scores: params.scores,
        extend: false
      });
      //no need to actions notice 
    };

    HistoryService.logPoint = function logPoint(params) {
      //params: playerid, scores, additional actions
      var id2 = "p2",
        text = '',
        scoretext = '',
        notetext = '',
        more = [],
        log = {},
        actions = params.actions || {},
        extend = params.extend || false;

      if (params.id === "p2") {
        id2 = "p1";
      }

      if (actions.game) {
        notetext = "Game";
        scoretext = params.scores[params.id].games + " / " + params.scores[id2].games;
        more.push('game');
      }
      if (actions.set ) {
        notetext = "Game, Set";
        more.push('set');
        scoretext = params.scores[params.id].sets + " / " + params.scores[id2].sets;
      }
      if (actions.match ) {
        notetext = "Game, Set, Match";
        more.push('match');
      }

      if (notetext === '' ){
        text = "Point to " + params.playername;
        scoretext = params.scores[params.id].pointname + " - " + params.scores[id2].pointname;
        notetext = params.scores[params.id].pointlabel + " - " + params.scores[id2].pointlabel;
        if (params.scores[params.id].pointlabel === params.scores[id2].pointlabel) {
          notetext = params.scores[id2].pointlabel + " all";
        }
      } else {
        text = "Point to " + params.playername + ", " + notetext;
      }

      log = {
        action: "point",
        player: "0",
        text: text,
        scoretext: scoretext,
        scores: params.scores,
        extend: extend
      };

      if (more.length > 0 ) {
        log.more = more;
      }

      HistoryService.logs.push(log);

      HistoryService.notice.evt = "point";
      HistoryService.notice.text = notetext;
    };

    HistoryService.logFault = function logFault(params) {
      //player id, scores, additional actions
      var text = 'Fault',
        actions = params.actions || {};

      if (actions.point) {
        text = "Double Fault";
      }

      HistoryService.logs.push ({
        action: "fault",
        player: params.id,
        text: text ,
        scoretext: '',
        scores: params.scores,
        extend: false
      });

      HistoryService.notice.evt = "fault";
      HistoryService.notice.text = text;

    };

    HistoryService.logChase = function logChase(params) {

      var description = "Chase " + params.chase.name.toLowerCase();
      if (params.chase.hazard) {
        description = "Hazard " + description.toLowerCase();
      }
      HistoryService.logs.push ({
        action: "chase",
        player: params.id,
        text: description ,
        scoretext: '',
        scores: params.scores,
        extend: false
      });
      HistoryService.notice.evt = "chase";
      HistoryService.notice.text = description;

    };

    HistoryService.logEnds = function logEnds(params){
      //first chase
      var text = "Change of ends. Play ";
      var description = "chase " + params.chase.name.toLowerCase();
      if (params.chase.hazard) {
        description = "hazard " + description;
      }

      HistoryService.logs.push ({
        action: "chase",
        player: '0',
        text: text + description,
        scoretext: '',
        scores: params.scores,
        extend: true
      });
      HistoryService.notice.evt = "chase";
      HistoryService.notice.text = text + description;


    };

    HistoryService.logSecondChase  = function logSecondChase(params){
      var text = ". Second chase: ";
      var description = params.chase.name.toLowerCase();
      if (params.chase.hazard) {
        description = "hazard " + description;
      }

      var lastlog = HistoryService.logs[HistoryService.logs.length-1];
      lastlog.text += text + description;

      HistoryService.notice.text += text + description;
    };

    return HistoryService;
  });
