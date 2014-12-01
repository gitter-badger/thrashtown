'use strict';

angular.module('thrashtownApp')
  .factory('SurfSpot', function($http, $rootScope) {
    // TODO: consider using $cacheFactor or other caching technique
    var service = {
      load: function (asObject) {
        return $http.get('/api/surf-spots').then(function (response) {
          return asObject ? _.indexBy(response.data, '_id') : response.data;
        });
      },

      create: function (spot) {
        return $http.post('/api/surf-spots', spot).then(function (response) {
          $rootScope.$broadcast('surfSpots:updated');
          return response.data;
        });
      },

      update: function (spot, id) {
        return $http.put('/api/surf-spots/' + id, spot).then(
          function (response) {
            $rootScope.$broadcast('surfSpots:updated');
            return response.data;
          });
      },

      delete: function (id) {
        return $http.delete('/api/surf-spots/' + id).then(function (response) {
          $rootScope.$broadcast('surfSpots:updated');
          return response.data;
        });
      }
 
    };

    return service;
  });