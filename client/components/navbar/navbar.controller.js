'use strict';

angular.module('thrashtownApp')
  .controller('NavbarCtrl', function ($scope, $state, Auth) {
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    // $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function () {
      Auth.logout();
      $state.go('login');
    };

    $scope.isActive = function (route) {
      return $state.includes(route);
    };
  });