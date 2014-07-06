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
      }).
      error(function(err){
        console.log(err);
      });
    };
    
    reloadSurfSpots();

    $scope.$on('surfSpots:updated', reloadSurfSpots);

  });