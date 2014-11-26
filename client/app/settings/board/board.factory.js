'use strict';

angular.module('thrashtownApp')
  .factory('Board', function($http, $rootScope) {
    // TODO: consider using $cacheFactor or other caching technique
    var service = {
      load: function () {
        return $http.get('/api/boards').then(function (response) {
          return response.data.boards;
        });
      },

      create: function (board) {
        return $http.post('/api/boards', board).then(function (newBoard) {
          $rootScope.$broadcast('quiver:updated');
          return newBoard;
        });
      },

      update: function (board, id) {
        return $http.put('/api/boards/' + id, board).then(
          function (response) {
            $rootScope.$broadcast('quiver:updated');
            return response.data.board;
          });
      },

      delete: function (id) {
        return $http.delete('/api/boards/' + id).then(function (response) {
          $rootScope.$broadcast('quiver:updated');
          return response.data.board;
        });
      }
 
    };

    return service;
  });