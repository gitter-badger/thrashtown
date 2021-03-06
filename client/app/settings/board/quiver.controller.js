'use strict';

angular.module('thrashtownApp')
  .controller('QuiverCtrl', function ($scope, Board, Modal) {
    
    var initialize = function () {
      $scope.formConfig = {};
      $scope.resetBoardForm();
      loadQuiver();
      $scope.$on('quiver:updated', loadQuiver);
    };

    var loadQuiver = function () {
      Board.load().then(function (boards) {
        $scope.boards = boards;
      }, function () {
        // TODO: handle error
      });
    };

    $scope.boardLength = function (board) {
      // Works because board.size is saved in this format: <feet>'<inches>"
      var dims = board.size.split('\'');
      return parseInt(dims[0]) * 12 + parseInt(dims[1]);
    };

    $scope.resetBoardForm = function () {
      $scope.formConfig.show = false;
      $scope.formConfig.params = {};
      $scope.formConfig.mode = null;
    };

    $scope.loadBoardForm = function (board) {
      $scope.formConfig.show = true;
      if (!!board) {
        $scope.formConfig.mode = 'edit';
        $scope.formConfig.params = angular.copy(board);
      } else {
        $scope.formConfig.mode = 'add';
      }
    };

    var handleSuccess = function () {
      // TODO: add an alert to confirm success
      $scope.resetBoardForm();
    };

    var handleError = function () {
      // TODO: handle error
    };

    $scope.saveBoard = function (form) {
      if (form.$valid) {
        if ($scope.formConfig.mode === 'add') {
          Board.create($scope.formConfig.params).then(handleSuccess,
            handleError);
        } else if ($scope.formConfig.mode === 'edit') {
          Board.update($scope.formConfig.params, $scope.formConfig.params._id)
            .then(handleSuccess, handleError);
        }
      }
    };

    $scope.deleteBoard = Modal.confirm.delete(function (board) {
      Board.delete(board._id).then(function () {
        // TODO: add an alert to confirm success
      });
    });
    
    initialize();

  });
