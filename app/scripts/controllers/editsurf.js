'use strict';

angular.module('hackathonApp')
  .controller('EditSurfCtrl', function ($filter, $http, $rootScope, $scope, $state, $stateParams) {
    
    $scope.errors = {};
    $scope.mode = 'edit';

    $http({
      method: 'GET',
      url: 'api/surfs/' + $stateParams.surfId
    }).then(function(response) {
      $scope.surf = response.data;
      var date = new Date(response.data.sessionDate);
      $scope.surf.sessionDate = $filter('date')(date, 'yyyy-MM-dd');
    }).catch(function(err) {
      //TODO:
      console.log('Error getting session from DB.', err);
    });

    $scope.saveSurf = function(form) {
      if(form.$valid) {
        // To set the session date to midnight of user's local time, not
        // midnight GMT as would otherwise happen if left unmodified from form
        var dateParts = $scope.surf.sessionDate.split('-');
        var month = parseInt(dateParts[1]) - 1;
        $scope.surf.sessionDate = new Date(dateParts[0], month, dateParts[2]);
        
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
      .then(function() {
        $rootScope.$broadcast('surf:updated');
        $state.go('surfs.review');
      })
      .catch(function(err){
        //TODO: probably want to present something to the user
        console.log(err);
      });
    };


  });