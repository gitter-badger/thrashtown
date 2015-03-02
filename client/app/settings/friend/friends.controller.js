'use strict';

angular.module('thrashtownApp')
  .controller('FriendsCtrl', function ($scope, Alert, Friend, Modal) {
        
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
      Alert.closeAll();
    };

    $scope.loadFriendForm = function () {
      $scope.formConfig.show = true;
    };

    var handleSuccess = function () {
      // TODO: add an alert to confirm success
      $scope.resetFriendForm();
      Alert.add('success', 'Your friend has been invited to connect.');
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
          .then(handleSuccess, function () {
            handleError($scope.formConfig.params.email)
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
