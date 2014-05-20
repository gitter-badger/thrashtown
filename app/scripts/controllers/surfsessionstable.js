'use strict';

angular.module('hackathonApp')
  .controller('SurfSessionsTableCtrl', function ($scope, $http) {
    $scope.errors = {};

    $http({
      method: 'GET',
      url: 'api/surfs',
    })
    .then(function(data) {
      $scope.surfs = data.data;
    })
    .catch( function() {
      //TODO: revisit this
      $scope.errors.other = 'Error with retrieving sessions data.';
    });
  });