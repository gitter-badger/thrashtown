'use strict';

angular.module('thrashtownApp')
  .factory('Friend', function ($http, $rootScope) {
    // TODO: consider using $cacheFactor or other caching technique
    var service = {
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

      acceptInvitation: function (friendId) {
        // TODO: how can I make this POST more RESTful.  Verb currently in path!
        return $http.post('/api/invitations/' + friendId + '/accept').
          then(function (response) {
            $rootScope.$broadcast('friend:accepted');
            return response.data;
          });
      } 
    };

    return service;
  });