'use strict';

angular.module('thrashtownApp')
  .controller('ReviewSurfsCtrl', 
    function ($scope, $state, Board, Modal, Surf, SurfSpot) {
      var initialize = function () {
        loadSurfs();
        $scope.$on('surfs:updated', loadSurfs);
        
        Board.load(true).then(function (boards) {
          $scope.boards = boards;
        });
        
        SurfSpot.load(true).then(function (surfSpots) {
          $scope.surfSpots = surfSpots;
        });
      };

      var loadSurfs = function () {
        Surf.load().then(function (surfs) {
          $scope.surfs = surfs;
        });
      };

      $scope.editSurf = function (surf) {
        $state.go('surfs.edit', {id: surf._id});
      };

      $scope.deleteSurf = Modal.confirm.delete(function (surf) {
        Surf.delete(surf._id).then(function () {
          // TODO: add an alert to confirm success
        });
      });

      initialize();
    });