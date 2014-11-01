'use strict';

angular.module('hackathonApp')
  .controller('LoginCtrl', function ($scope, $state, Auth) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function (form) {
      $scope.submitted = true;
      
      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then(function () {
          $state.go('main');
        })
        .catch(function (err) {
          err = err.data;
          $scope.errors.other = err.message;
        });
      }
    };
  });