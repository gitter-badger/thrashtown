'use strict';

angular.module('thrashtownApp')
  .controller('FeedCtrl', function ($http, $q, $scope, $state, Modal, Surf, User) {
    var initialize = function () {
      $scope.isLoading = true;
      $q.all([
        loadUser(),
        loadFeed()
      ]).then(function () {
        $scope.isLoading = false;
      });
    };
    
    var loadUser = function () {
      return User.get().$promise.then(function(user) {
        $scope.userId = user._id;
      });
    };

    var loadFeed = function () {
      return Surf.feed().then(function (data) {
        $scope.surfs = data.surfs;
        $scope.total = data.total;
      }, function () {
        //TODO: handle errors
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

    $scope.$on('surfs:updated', loadFeed);

    initialize();
  });
