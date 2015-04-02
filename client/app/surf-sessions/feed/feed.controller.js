'use strict';

angular.module('thrashtownApp')
  .controller('FeedCtrl', function ($http, $q, $scope, User) {
    var cachedSessions;
    var userId;
    var initialize = function () {
      $scope.isLoading = true;
      $scope.selectedFilter = 'all';
      $q.all([
        loadUser(),
        loadFeed()
      ]).then(function () {
        $scope.isLoading = false;
      });
      loadUser();
      loadFeed();
    };
    
    var loadUser = function () {
      return User.get().$promise.then(function(user) {
        userId = user._id;
      });
    };

    var loadFeed = function () {
      return $http.get('/api/surfs/feed').then(function (response) {
        cachedSessions = response.data;
        filterSessions();
      }, function () {
        //TODO: handle errors
      });
    };

    // If mine === true, only show mine, if false show everything but mine
    var filterSessions = function () {
      $scope.surfs = _.filter(cachedSessions, function (session) {
        var id = session.user_id._id;
        if ($scope.selectedFilter === 'all') {
          return true;
        } else if ($scope.selectedFilter === 'mine') {
          return id === userId;
        } else {
          return id !== userId;
        }
      });
    };

    $scope.$watch('selectedFilter', filterSessions);

    initialize();
  });
