'use strict';

angular.module('thrashtownApp')
  .controller('MainCtrl', function ($scope, Auth) {
    $scope.isLoggedIn = Auth.isLoggedIn;
  });
