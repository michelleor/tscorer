'use strict';

angular.module('tscorerApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/Setup', {
        templateUrl: 'views/setup.html',
        controller: 'SetupCtrl as setup'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
