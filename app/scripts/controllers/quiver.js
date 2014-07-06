'use strict';

angular.module('hackathonApp')
  .controller('QuiverCtrl', function ($scope, $rootScope, $state, $http) {
    // On load, reset in case there was a value
    $scope.editBoard = null;

    $scope.loadEditView = function(board) {
      $scope.editBoard = angular.copy(board);
      $state.go('settings.quiver.board');
    };

    $scope.loadAddView = function() {
      $scope.editBoard = null;
      $state.go('settings.quiver.board');
    };

    var reloadQuiver = function() {
      $http({
        method: 'GET',
        url: '/api/boards'
      })
      .success(function(data) {
        $rootScope.boards = data.boards.sort(function(a, b) {
          return a.name > b.name;
        });
      })
      .error(function(err) {
        console.log(err);
      });
    };

    $scope.deleteBoard = function(board) {
      $http({
        method: 'DELETE',
        url: '/api/boards/' + board._id
      }).
      success(function(){
        reloadQuiver();
      }).
      error(function(err){
        console.log(err);
      });
    };
    
    reloadQuiver();

    $scope.$on('quiver:updated', reloadQuiver);

  });