'use strict';
angular.module('tscorerApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngAnimate',
  'mgcrea.ngStrap',
  'tscorerAppMocks' //allow game page to be loaded with dummy data.  TODO - remove once page is complete

])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .when('/Setup', {
        templateUrl: 'views/setup.html',
        controller: 'SetupCtrl'
      })
      .when('/Game', {
        templateUrl: 'views/game.html',
        controller: 'GameCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function ($rootScope, $location) {
  $rootScope.$on("$locationChangeStart", function () {
    $rootScope.path = $location.path();
  });
});
