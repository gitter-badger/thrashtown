'use strict';

angular.module('hackathonApp')
  .controller('CreateSurfCtrl', function ($rootScope, $scope, $http, $state) {
    
    $scope.errors = {};
    
    // Default values
    $scope.surf = {
      sessionDate: new Date().toISOString().substring(0, 10),
      waveQuality: 3,
      hollowness: 3,
      funFactor: 3,
      crowdFactor: 3,
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
        // else if b/c surfSpots could be empty
        $scope.surf.surfSpot_id = $rootScope.userProfile.surfSpots[0]._id;
      }
    };
    
    if ($rootScope.userProfile) {
      loadAsyncDefaults();
    } else {
      $rootScope.$on('userProfileLoaded', loadAsyncDefaults);
    }


    $scope.createSurf = function(form) {
      if(form.$valid) {
        // To set the session date to midnight of user's local time, not
        // midnight GMT as would otherwise happen if left unmodified from form
        var dateParts = $scope.surf.sessionDate.split('-');
        var month = parseInt(dateParts[1]) - 1;
        $scope.surf.sessionDate = new Date(dateParts[0], month, dateParts[2]);
        
        $http({
          method: 'POST',
          url: 'api/surfs',
          data: $scope.surf
        })
        .then( function() {
          $rootScope.$broadcast('surf:updated');
          $state.go('surfs.review');
          // $scope.message = 'Surf session successfully added.';
        })
        .catch( function() {
          //TODO: revisit this
          $scope.errors.other = 'Error with saving session.';
        });
      }
    };
  });