'use strict';

angular.module('thrashtownApp')
  .controller('FriendsCtrl', function ($scope, Alert, Friend, Modal) {
        
    var initialize = function () {
      $scope.formConfig = {};
      $scope.resetFriendForm();
      loadInvitations();
      loadFriends();
      // $scope.$on('friends:updated', loadInvitations);
    };

    var loadInvitations = function () {
      Friend.loadInvitations().then(function (invitations) {
        $scope.invitations = invitations;
      }, function () {
        // TODO: handle error
      });
    };

    var loadFriends = function () {
      Friend.loadFriends().then(function (friends) {
        $scope.friends = friends;
      });
    };

    $scope.resetFriendForm = function () {
      $scope.formConfig.show = false;
      $scope.formConfig.params = {};
      Alert.closeAll();
    };

    $scope.loadFriendForm = function () {
      $scope.formConfig.show = true;
    };

    var handleSuccess = function (data) {
      $scope.resetFriendForm();
      var alertMessage;
      var alertType;
      if (!!data.code) {
        alertType = 'info';
        alertMessage = data.message;
      } else {
        alertType = 'success';
        alertMessage = 'Your friend has been invited to connect.';
      }
      Alert.add(alertType, alertMessage);
    };

    var handleError = function (email) {
      Alert.add('danger', 
                'No user found with email address of <strong>' + email +
                '</strong>. Your friend may not be registered.');
    };

    $scope.inviteFriend = function (form) {
      if (form.$valid) {
        // TODO: this would be best but it causes a blip
        Alert.closeAll();
        Friend
          .createInvitation($scope.formConfig.params)
          .then(function (data) {
            handleSuccess(data);
          }, function () {
            handleError($scope.formConfig.params.email);
          });
      }
    };

    $scope.acceptInvitation = function (id, email) {
      // console.log(id);
      // Friend.acceptInvitation(id);
      Friend.acceptInvitation(id).then(function (friend) {
        Alert.add('success', 'You are now friends with ' + friend.name +
                  '(' + email + ')');
        // TODO: splice out the invitation
      }, function () {
        Alert.add('danger', 'Oops, something went wrong');
        // TODO: splice out the invitation (maybe?)
      });
    };
    
    initialize();
  });
