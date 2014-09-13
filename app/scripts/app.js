'use strict';

angular.module('tscorerApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngAnimate'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .when('/Setup', {
        templateUrl: 'views/setup.html',
        controller: 'SetupCtrl as setup'
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
