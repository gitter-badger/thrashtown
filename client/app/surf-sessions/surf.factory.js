'use strict';

angular.module('thrashtownApp')
  .factory('Surf', function($http, $rootScope) {
    // TODO: consider using $cacheFactor or other caching technique
    var service = {
      load: function () {
        return $http.get('/api/surfs').then(function (response) {
          return response.data;
        });
      },

      show: function (id) {
        return $http.get('/api/surfs/' + id).then( function (response) {
          return response.data;
        });
      },

      create: function (surf) {
        return $http.post('/api/surfs', surf).then(function (response) {
          $rootScope.$broadcast('surfs:updated');
          return response.data;
        });
      },

      update: function (surf, id) {
        return $http.put('/api/surfs/' + id, surf).then(
          function (response) {
            $rootScope.$broadcast('surfs:updated');
            return response.data;
          });
      },

      delete: function (id) {
        return $http.delete('/api/surfs/' + id).then(function () {
          $rootScope.$broadcast('surfs:updated');
          //TODO: see the other to do in the API
          // return response.data;
        });
      }
 
    };

    return service;
  });