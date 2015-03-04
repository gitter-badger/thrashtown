'use strict';

angular.module('thrashtownApp')
  .factory('Friend', function ($http, $rootScope) {
    // TODO: consider using $cacheFactor or other caching technique
    var service = {
      loadFriends: function () {
        return $http.get('/api/friends').then(function (response) {
          return response.data;
        });
      },

      loadInvitations: function () {
        return $http.get('/api/invitations').then(function (response) {
          return response.data;
        });
      },

      createInvitation: function (friend) {
        return $http.post('/api/invitations', friend).then(function (response) {
          $rootScope.$broadcast('friend:invited');
          return response.data;
        });
      },

      respondToInvitation: function (friendId, accept) {
        return $http.post('/api/invitations/' + friendId, 
          {acceptInvitation: !!accept}).then(function (response) {
            $rootScope.$broadcast('friend:invitationResponse');
            return response.data;
          });
      } 
    };

    return service;
  });