'use strict';

angular.module('hackathonApp')
  .controller('CreateSurfCtrl', function ($filter, $rootScope, $scope, $http, $state) {

    $scope.errors = {};
    $scope.mode = 'add';

    // Default values
    var d = new Date();

    $scope.surf = {
      sessionDate: new Date(d.getFullYear(),
                            d.getMonth(),
                            d.getDate(),
                            d.getHours(),
                            d.getMinutes()),
      sessionHours: 2,
      waveQuality: 3,
      hollowness: 3,
      funFactor: 3,
      crowdedness: 3,
      otherFriends: 0};
    
    // TODO: revisit this implementation
    // need a way to 'finish' load in resolve I think
    var loadAsyncDefaults = function() {
      var defaultBoard = _.findWhere($rootScope.userProfile.boards, {default: true});
      if (defaultBoard) {
        // It's possible that user has not made any board the default.
        $scope.surf.board_id = defaultBoard._id;
      }
      var defaultSurfSpot = _.findWhere($rootScope.userProfile.surfSpots, {default: true});
      if (defaultSurfSpot) {
        // It's possible that user has not made any spot the default.
        $scope.surf.surfSpot_id = defaultSurfSpot._id;
      } else if ($rootScope.userProfile.surfSpots.length) {
        // SurfSpots could be empty
        $scope.surf.surfSpot_id = $rootScope.userProfile.surfSpots[0]._id;
      }
    };
    
    if ($rootScope.userProfile) {
      loadAsyncDefaults();
    } else {
      $rootScope.$on('userProfileLoaded', loadAsyncDefaults);
    }

    $scope.saveSurf = function(form) {
      if(form.$valid) {
        
        $http({
          method: 'POST',
          url: 'api/surfs',
          data: $scope.surf
        })
        .then(function() {
          $rootScope.$broadcast('surf:updated');
          $state.go('surfs.review');
        })
        .catch(function() {
          //TODO: revisit this
          $scope.errors.other = 'Error saving session.';
        });
      }
    };
  
  });