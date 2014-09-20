'use strict';

angular.module('hackathonApp')
  .controller('EditSurfCtrl', function ($filter, $http, $rootScope, $scope, $state, $stateParams) {
    
    $scope.errors = {};
    $scope.mode = 'edit';

    $http({
      method: 'GET',
      url: 'api/surfs/' + $stateParams.surfId
    }).then(function (response) {
      $scope.surf = response.data;
      $scope.surf.sessionDate = new Date($scope.surf.sessionDate);
    }).catch(function (err) {
      //TODO:
      console.log('Error getting session from DB.', err);
    });

    $scope.saveSurf = function (form) {
      if(form.$valid) {
        
        $http({
          method: 'PUT',
          url: 'api/surfs/' + $scope.surf._id,
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

    $scope.deleteSurf = function(surf) {
      $http({
        method: 'DELETE',
        url: 'api/surfs/' + surf._id
      })
      .then(function () {
        $rootScope.$broadcast('surf:updated');
        $state.go('surfs.review');
      })
      .catch(function (err) {
        //TODO:
        console.log(err);
      });
    };


  });