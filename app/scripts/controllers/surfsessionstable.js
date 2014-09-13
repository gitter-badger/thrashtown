'use strict';

angular.module('hackathonApp')
  .controller('SurfSessionsTableCtrl', function ($http, $rootScope, $scope, $state) {
    $scope.editSurf = function (surf) {
      $state.go('surfs.edit', {surfId: surf._id});
    };

    $scope.deleteSurf = function(surf) {
      $http({
        method: 'DELETE',
        url: '/api/surfs/' + surf._id
      })
      .then(function() {
        $rootScope.$broadcast('surf:deleted');
        $state.go('surfs.review');
      })
      .catch(function(err){
        //TODO: probably want to present something to the user
        console.log(err);
      });
    };

  });