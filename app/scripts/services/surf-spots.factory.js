'use strict';

angular.module('hackathonApp')
  .factory('SurfSpots', function($http, $rootScope) {
    // TODO: consider using $cacheFactor or other caching technique
    var service = {
      load: function () {
        return $http.get('/api/surfspots').then(function (response) {
          return response.data.surfSpots;
        });
      },

      create: function (spot) {
        return $http.post('/api/surfspots', spot).then(function (newSpot) {
          $rootScope.$broadcast('surfSpots:updated');
          return newSpot;
        });
      },

      update: function (spot, id) {
        return $http.put('/api/surfspots/' + id, spot).then(
          function (response) {
            $rootScope.$broadcast('surfSpots:updated');
            return response.data.surfSpots;
          });
      },

      delete: function (id) {
        return $http.delete('/api/surfspots/' + id).then(function (response) {
          $rootScope.$broadcast('surfSpots:updated');
          return response.data.surfSpot;
        });
      }
 
    };

    return service;
  });