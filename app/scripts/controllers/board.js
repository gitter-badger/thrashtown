'use strict';

angular.module('hackathonApp')
  .controller('BoardCtrl', function ($scope, $stateParams, $rootScope, $http, $state) {
    
    $scope.$parent.$watch('editBoard', function() {
      if ($scope.editBoard === null) {
        $scope.mode = 'add';
        $scope.params = {};
      } else {
        $scope.mode = 'edit';
        $scope.params = $scope.editBoard;
      }
    });

    $scope.updateBoard = function(form, method) {
      if (form.$valid) {
        var apiUrl;
        if (method === 'PUT') {
          apiUrl = 'api/boards/' + $scope.params._id;
        } else if (method === 'POST') {
          apiUrl = 'api/boards';
        }

        $http({
          method: method,
          url: apiUrl,
          data: $scope.params
        })
        .success(function() { 
          // Need to let other services in the app know.
          $rootScope.$broadcast('quiver:updated');
          $state.go('settings.quiver');
        })
        .error(function(err) {
          console.log(err);
        });
      }
    };
  });