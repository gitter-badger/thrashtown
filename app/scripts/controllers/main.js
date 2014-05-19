'use strict';

angular.module('hackathonApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/surfs').success(function(surfs) {
      $scope.surfs = surfs;
    });
  });
