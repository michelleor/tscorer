'use strict';

/**
 * @ngdoc function
 * @name tscorerApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the tscorerApp
 */
angular.module('tscorerApp')
  .controller('HeaderCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {

    $scope.showmenu = false;
    $scope.toggleMenu = function() {
      $scope.showmenu = !$scope.showmenu;
    };

    $scope.showHistory = function() {
      $rootScope.$broadcast('showhistory');
    };

    $rootScope.$on("$locationChangeStart", function () {
      $scope.showmenu = false;
    });

  }]);
