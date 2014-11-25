'use strict';

angular.module('thrashtownApp')
  .controller('SurfSpotsCtrl', function ($scope, SurfSpots) {

    var initialize = function () {
      $scope.formConfig = {};
      $scope.resetSurfSpotForm();
      loadSurfSpots();
      $scope.$on('surfSpots:updated', loadSurfSpots);
    };

    var loadSurfSpots = function () {
      SurfSpots.load().then(function (surfSpots) {
        $scope.surfSpots = surfSpots;
      }, function () {
        // TODO: handle error
      });
    };

    $scope.surfSpotLatitude = function (surfSpot) {
      return !!surfSpot.lat ? surfSpot.lat : -1;
    };

    $scope.resetSurfSpotForm = function () {
      $scope.formConfig.show = false;
      $scope.formConfig.params = {};
      $scope.formConfig.mode = null;
    };

    $scope.loadSurfSpotForm = function (surfSpot) {
      $scope.formConfig.show = true;
      if (!!surfSpot) {
        $scope.formConfig.mode = 'edit';
        $scope.formConfig.params = angular.copy(surfSpot);
      } else {
        $scope.formConfig.mode = 'add';
      }
    };

    var handleSuccess = function () {
      // TODO: add an alert to confirm success
      $scope.resetSurfSpotForm();
    };

    var handleError = function () {
      // TODO: handle error
    };

    $scope.saveSurfSpot = function (form) {
      if (form.$valid) {
        if ($scope.formConfig.mode === 'add') {
          SurfSpots.create($scope.formConfig.params).then(handleSuccess,
            handleError);
        } else if ($scope.formConfig.mode === 'edit') {
          SurfSpots.update($scope.formConfig.params,
            $scope.formConfig.params._id).then(handleSuccess, handleError);
        }
      }
    };

    $scope.deleteSurfSpot = function (surfSpot) {
      SurfSpots.delete(surfSpot._id).then(function () {
        // TODO: add an alert to confirm success
      });
    };
    
    initialize();

  });


