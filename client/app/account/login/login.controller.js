'use strict';

angular.module('thrashtownApp')
  .controller('LoginCtrl', function ($scope, $state, Auth) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $state.go('main');
        })
        .catch( function (err) {
          $scope.errors.other = err.message;
        });
      }
    };

  });
