'use strict';

angular.module('thrashtownApp')
  .controller('FeedCtrl', function ($http, $scope) {
    var initialize = function () {
      loadFeed();
    };
    var loadFeed = function () {
      $http.get('/api/surfs/feed').then(function (response) {
        $scope.surfs = response.data;
      }, function () {
        //TODO: handle errors
      });
    };

    initialize();
  });
