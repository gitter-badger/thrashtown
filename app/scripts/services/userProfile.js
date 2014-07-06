'use strict';

angular.module('hackathonApp')
  .factory('UserProfile', function($rootScope, $http) {
    return {
      loadUserProfile: function() {
        $http({
          method: 'GET',
          url: '/api/users/me'
        }).success(function(profile){
          $rootScope.userProfile = profile;
          
          // For quick lookup where needed, create these as objects keyed off _id
          $rootScope.boards = {};
          $rootScope.surfSpots = {};
          
          for(var i = 0; i < profile.boards.length; i++) {
            var board = profile.boards[i];
            $rootScope.boards[board._id] = board;
          }

          for(var j = 0; j < profile.surfSpots.length; j++) {
            var surfSpot = profile.surfSpots[j];
            $rootScope.surfSpots[surfSpot._id] = surfSpot;
          }
        }).error(function(err) {
          console.log(err);
        });
      },

      loadSurfSessions: function() {
        $http({
          method: 'GET',
          url: '/api/surfs'
        }).success(function(surfs){
          $rootScope.surfs = surfs;
        }).error(function(err) {
          console.log(err);
        }); 
      }

    };
  });