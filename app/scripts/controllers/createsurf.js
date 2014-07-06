'use strict';

angular.module('hackathonApp')
  .controller('CreateSurfCtrl', function ($rootScope, $scope, $http) {
    $scope.surf = {};
    $scope.errors = {};
    
    // Set some defaults.
    var defaultBoard = _.findWhere($rootScope.userProfile.boards, {default: true});
    if (defaultBoard) {
      // It's possible that user has not made any board the default.
      $scope.surf.board_id = defaultBoard._id;
    }
    var defaultSurfSpot = _.findWhere($rootScope.userProfile.surfSpots, {default: true});
    if (defaultSurfSpot) {
      // It's possible that user has not made any spot the default.
      $scope.surf.surfSpot_id = defaultSurfSpot._id;
    }
    $scope.surf.sessionDate = new Date().toISOString().substring(0, 10);
    $scope.surf.waveQuality = 3;
    $scope.surf.hollowness = 3;
    $scope.surf.funFactor = 3;
    $scope.surf.crowdFactor = 3;
    $scope.surf.otherFriends = 0;
    
    $scope.createSurf = function(form) {
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