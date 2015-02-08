'use strict';

angular.module('thrashtownApp')
  .controller('FriendsCtrl', function ($scope, Friend, Modal) {
        
    var initialize = function () {
      $scope.formConfig = {};
      $scope.resetFriendForm();
      loadInvitations();
      // $scope.$on('friends:updated', loadInvitations);
    };

    var loadInvitations = function () {
      Friend.loadInvitations().then(function (invitations) {
        $scope.invitations = invitations;
      }, function () {
        // TODO: handle error
      });
    };

    $scope.resetFriendForm = function () {
      $scope.formConfig.show = false;
      $scope.formConfig.params = {};
    };

    $scope.loadFriendForm = function () {
      $scope.formConfig.show = true;
    };

    var handleSuccess = function () {
      // TODO: add an alert to confirm success
      $scope.resetFriendForm();
    };

    var handleError = function () {
      // TODO: handle error
    };

    $scope.inviteFriend = function (form) {
      if (form.$valid) {
        Friend
          .createInvitation($scope.formConfig.params)
          .then(handleSuccess, handleError);
      }
    };

    $scope.acceptInviation = Modal.confirm.delete(function (invitation) {
      // Board.delete(board._id).then(function () {
      //   // TODO: add an alert to confirm success
      // });
    });
    
    initialize();
  });
