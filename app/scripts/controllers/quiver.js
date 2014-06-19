'use strict';

angular.module('hackathonApp')
  .controller('QuiverCtrl', function ($scope, $http, $location) {
    $scope.boards = [];
    $scope.errors = {};

    $scope.setQuiver = function(form) {
      $scope.submitted = true;
  
      if(form.$valid) {
        $http({
          method: 'POST',
          url: 'api/users/me/boards',
          data: $scope.boards
        })
        .then(function() {
          // Account created, redirect to home
          $location.path('/');
        })
        .catch(function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };
  });