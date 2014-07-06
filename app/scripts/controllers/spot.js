'use strict';

angular.module('hackathonApp')
  .controller('SpotCtrl', function ($scope, $stateParams, $rootScope, $http, $state) {
    
    $scope.$parent.$watch('editSurfSpot', function() {
      if ($scope.editSurfSpot === null) {
        $scope.mode = 'add';
        $scope.params = {};
      } else {
        $scope.mode = 'edit';
        $scope.params = $scope.editSurfSpot;
      }
    });

    $scope.updateSurfSpot = function(form, method) {
      if (form.$valid) {
        var apiUrl;
        if (method === 'PUT') {
          apiUrl = 'api/surfspots/' + $scope.params._id;
        } else if (method === 'POST') {
          apiUrl = 'api/surfspots';
        }

        $http({
          method: method,
          url: apiUrl,
          data: $scope.params
        })
        .success(function() { 
          $rootScope.$broadcast('surfSpots:updated');
          $state.go('settings.surfSpots');
        })
        .error(function(err) {
          console.log(err);
        });
      }
    };
  });