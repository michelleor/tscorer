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
      text: ''
    };
    HistoryService.lastactions = [];

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

      HistoryService.notice.text = text;

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
        lasttext = '',
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
        lasttext = text;
        scoretext = params.scores[params.id].pointname + " - " + params.scores[id2].pointname;
        notetext = params.scores[params.id].pointlabel + " - " + params.scores[id2].pointlabel;
        if (params.scores[params.id].pointlabel === params.scores[id2].pointlabel) {
          notetext = params.scores[id2].pointlabel + " all";
        }
      } else {
        text = "Point to " + params.playername + ", " + notetext;
        lasttext = text + ". " + notetext;
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

      HistoryService.notice.text = notetext;

      if (extend) {
        HistoryService.lastactions[HistoryService.lastactions.length-1] += ", " +lasttext;
      } else {
        if (HistoryService.lastactions.length === 2 ){
          HistoryService.lastactions.splice(0,1);
        }
        HistoryService.lastactions.push(lasttext);
      }

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

      if (HistoryService.lastactions.length === 2 ){
        HistoryService.lastactions.splice(0,1);
      }
      HistoryService.lastactions.push(text);
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
      if (HistoryService.lastactions.length === 2 ){
        HistoryService.lastactions.splice(0,1);
      }
      HistoryService.lastactions.push(description);
      HistoryService.notice.text = description;

    };

    HistoryService.logEnds = function logEnds(params){
      //first chase
      var text = "Change of ends: play ";
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

      //if (HistoryService.lastactions.length === 2 ){
      //  HistoryService.lastactions.splice(0,1);
      //}
      //HistoryService.lastactions.push(text + description);
      HistoryService.lastactions[HistoryService.lastactions.length-1] += ", " + text.toLowerCase() + description;
      if (params.chaseCount === 2 ) {
        HistoryService.notice.text += ", " + text.toLowerCase() + description;
      } else {
        HistoryService.notice.text += ", change of ends";
      }


    };

    HistoryService.logSecondChase  = function logSecondChase(params){
      var text = ". Second chase: ";
      var description = params.chase.name.toLowerCase();
      if (params.chase.hazard) {
        description = "hazard " + description;
      }

      var lastlog = HistoryService.logs[HistoryService.logs.length-1];
      lastlog.text += text + description;

      HistoryService.lastactions[HistoryService.lastactions.length-1] += text + description;
    };

    HistoryService.logUndo = function logUndo(params){
      var text = params.text;
      if (text.indexOf(': ')> 0 ) {
        text = text.substring(0, text.indexOf(': '));
      }
      if (text.indexOf('. ')> 0) {
        text = text.substring(0, text.indexOf('. '));
      }

      HistoryService.logs.push ({
        action: "undo",
        player: '0',
        text: "Undo " + text,
        scoretext: '',
        scores: params.scores,
        extend: true
      });
    };

    return HistoryService;
  });
