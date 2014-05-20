'use strict';

angular.module('hackathonApp')
  .controller('CreateSurfCtrl', function ($scope, $http) {
    $scope.errors = {};
    $scope.surf = {
      location: 'SF - Ocean Beach',
      otherFriends: 0,
      waveQuality: 2,
      hollowness: 3,
      funFactor: 2,
      crowdedness: 4,
      board: 'Fish', //TODO:
      sessionDate: new Date(),
    //   waterEntryTime: new Date(),
    //   waterExitTime: new Date()
    };

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