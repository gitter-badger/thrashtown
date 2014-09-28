'use strict';

angular.module('hackathonApp')
  .controller('SurfSpotsCtrl', function ($scope, $rootScope, $state, $http) {
    // On load, reset in case there was a value
    $scope.editSurfSpot = null;

    $scope.loadEditView = function(surfSpot) {
      $scope.editSurfSpot = angular.copy(surfSpot);
      $state.go('settings.surfSpots.spot');
    };

    $scope.loadAddView = function() {
      $scope.editSurfSpot = null;
      $state.go('settings.surfSpots.spot');
    };

    //TODO: refactor to into a service
    var reloadSurfSpots = function() {
      $http({
        method: 'GET',
        url: '/api/surfspots'
      })
      .success(function(data) {
        $rootScope.surfSpots = data.surfSpots.sort(function(a, b) {
          return b.lat - a.lat;
        });
      })
      .error(function(err) {
        console.log(err);
      });
    };

    $scope.deleteSurfSpot = function(surfSpot) {
      $http({
        method: 'DELETE',
        url: '/api/surfspots/' + surfSpot._id
      }).
      success(function(){
        reloadSurfSpots();
        // Need to let other services in the app know.
        $rootScope.$broadcast('surfSpots:updated');
      }).
      error(function(err){
        console.log(err);
      });
    };
    
    reloadSurfSpots();

    $scope.$on('surfSpots:updated', reloadSurfSpots);

  });