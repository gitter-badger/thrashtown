'use strict';

angular.module('hackathonApp')
  .controller('CreateSurfCtrl', function ($scope, $http) {
    // Defaults to today.
    $scope.date = new Date();
    
    $scope.errors = {};

    $scope.createSurf = function(form) {
      // $scope.submitted = true;
      if(form.$valid) {
        $http({
          method: 'POST',
          url: 'api/surfs',
          data: $scope.surf
        })
        .then( function() {
          //TODO: revisit this
          $scope.message = 'Surf session successfully added.';
        })
        .catch( function() {
          //TODO: revisit this
          $scope.errors.other = 'Error with saving session.';
        });
      }
    };
  });