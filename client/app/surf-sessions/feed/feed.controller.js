'use strict';

angular.module('thrashtownApp')
  .controller('FeedCtrl', function ($location, $q, $scope, $state, $stateParams, Modal, Surf, User) {
    var initialize = function () {
      $scope.currentPage = $stateParams.page || 1;
      $scope.isLoading = true;
      $q.all([
        loadUser(),
        loadFeed($scope.currentPage)
      ]).then(function () {
        $scope.isLoading = false;
      });
    };
    
    var loadUser = function () {
      return User.get().$promise.then(function(user) {
        $scope.userId = user._id;
      });
    };

    var loadFeed = function (page) {
      return Surf.feed(page).then(function (data) {
        $scope.surfs = data.surfs;
        $scope.resultsPerPage = data.resultsPerPage;
        $scope.totalSurfs = data.total;
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

    // Need the ng-if in the template, due to this: https://github.com/angular-ui/bootstrap/issues/3118
    $scope.changePage = function (page) {
      $location.search('page', page);
    };

    $scope.$on('surfs:updated', loadFeed);

    initialize();
  });
