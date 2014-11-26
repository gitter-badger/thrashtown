'use strict';

angular.module('thrashtownApp')
  .factory('SurfSpot', function($http, $rootScope) {
    // TODO: consider using $cacheFactor or other caching technique
    var service = {
      load: function () {
        return $http.get('/api/surf-spots').then(function (response) {
          return response.data.surfSpots;
        });
      },

      create: function (spot) {
        return $http.post('/api/surf-spots', spot).then(function (newSpot) {
          $rootScope.$broadcast('surfSpots:updated');
          return newSpot;
        });
      },

      update: function (spot, id) {
        return $http.put('/api/surf-spots/' + id, spot).then(
          function (response) {
            $rootScope.$broadcast('surfSpots:updated');
            return response.data.surfSpots;
          });
      },

      delete: function (id) {
        return $http.delete('/api/surf-spots/' + id).then(function (response) {
          $rootScope.$broadcast('surfSpots:updated');
          return response.data.surfSpot;
        });
      }
 
    };

    return service;
  });