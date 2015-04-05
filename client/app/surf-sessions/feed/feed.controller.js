'use strict';

angular.module('thrashtownApp')
  .controller('FeedCtrl', function ($http, $q, $scope, $state, Modal, Surf, User) {
    var cachedSessions;
    var initialize = function () {
      $scope.isLoading = true;
      $scope.sortBy = 'sessionDate';
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
        $scope.userId = user._id;
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
          return id === $scope.userId;
        } else {
          return id !== $scope.userId;
        }
      });
    };

    $scope.editSurf = function (surf) {
      $state.go('surfs.edit', {id: surf._id});
    };

    $scope.deleteSurf = Modal.confirm.delete(function (surf) {
      Surf.delete(surf._id).then(function () {
        // TODO: add an alert to confirm success
      });
    });

    // var sortSessions = function () {
    //   $scope.surfs.sort(function (a, b) {
    //     return a[$scope.sortBy] < b[$scope.sortBy];
    //   });
    // };

    $scope.$watch('selectedFilter', filterSessions);
    $scope.$on('surfs:updated', loadFeed);

    initialize();
  });
