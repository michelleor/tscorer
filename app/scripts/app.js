'use strict';
angular.module('tscorerApp', [
  'ngCookies',
  'ngSanitize',
  'ngRoute',
  // @if DEBUG
  'tscorerAppMocks',  // Won't be included in production builds
  // @endif
  'ngAnimate',
  'ngDialog'

])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'StartCtrl'
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
