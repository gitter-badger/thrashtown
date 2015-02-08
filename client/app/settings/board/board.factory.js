'use strict';

angular.module('thrashtownApp')
  .factory('Board', function ($http, $rootScope) {
    // TODO: consider using $cacheFactor or other caching technique
    var service = {
      load: function (asObject) {
        return $http.get('/api/boards').then(function (response) {
          return asObject ? _.indexBy(response.data, '_id') : response.data;
        });
      },

      create: function (board) {
        return $http.post('/api/boards', board).then(function (response) {
          $rootScope.$broadcast('quiver:updated');
          return response.data;
        });
      },

      update: function (board, id) {
        return $http.put('/api/boards/' + id, board).then(
          function (response) {
            $rootScope.$broadcast('quiver:updated');
            return response.data;
          });
      },

      delete: function (id) {
        return $http.delete('/api/boards/' + id).then(function (response) {
          $rootScope.$broadcast('quiver:updated');
          return response.data;
        });
      }
 
    };

    return service;
  });