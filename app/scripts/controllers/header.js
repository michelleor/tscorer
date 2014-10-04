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
    $scope.toggleMenu = function toggleMenu() {
      $scope.showmenu = !$scope.showmenu;
    };

    $scope.showHistory = function showHistory() {
      $rootScope.$broadcast('showhistory');
    };

    $scope.showSettings = function showSettings(){
      $rootScope.$broadcast('showsettings');
    };

    $rootScope.$on("$locationChangeStart", function hideMenu() {
      $scope.showmenu = false;
    });

  }]);
