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

    $scope.inviteFriend = function (form) {
      if (form.$valid) {
        // TODO: this would be best but it causes a blip
        Alert.closeAll();
        Friend
          .createInvitation($scope.formConfig.params)
          .then(function (data) {
            $scope.resetFriendForm();
            // TODO: Probably a better way.  Currently, if data has a code, then
            // TODO: that means it's some message from the server
            var alertType;
            var alertMessage;
            if (!!data.code) {
              alertType = data.type || 'info';
              alertMessage = data.message;
            } else {
              alertType = 'success';
              alertMessage = 'Your friend has been invited to connect.';
            }
            Alert.add(alertType, alertMessage);
          }, function () {
            Alert.add('danger', 
                'No user found with email address of <strong>' + 
                $scope.formConfig.params.email +
                '</strong>. Your friend may not be registered.');
          });
      }
    };

    $scope.respondToInvitation = function (index, accept, email) {
      Friend.respondToInvitation($scope.invitations[index]._id, accept)
        .then(function (data) {
          // TODO: Need a better unified object structure back from the API
          // TODO: regardless of action taken
          if (data.code === 'INVITATION_REJECTED') {
            Alert.add('warning', data.message);
          } else {
            Alert.add('success', 'You are now friends with ' + data.name +
                      ' (' + email + ')');
            loadFriends();
          }
          $scope.invitations.splice(index, 1);
        }, function () {
          Alert.add('danger', 'Oops, something went wrong');
          // TODO: splice out the invitation (maybe?)
        });
    };
    
    initialize();
  });
