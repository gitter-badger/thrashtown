'use strict';

angular.module('thrashtownApp')
  .controller('SurfLogCtrl', 
    function ($scope, $state, $stateParams, Board, Surf, SurfSpot) {

      var initialize = function () {
        var mode = !!$stateParams.id ? 'edit' : 'add';
        $scope.formConfig = {
          mode: mode,
          commentLength: 500,
          commentCharactersRemaining: function () {
            var used = 0;
            if (!!this.params.comment) {
              used = this.params.comment.length;
            }
            return this.commentLength - used;
          },
          params: {}
        };
        $scope.alerts = [];
        loadResources();

        if (mode === 'edit') {
          Surf.show($stateParams.id)
            .then(function (surf) {
              surf.sessionDate = new Date(surf.sessionDate);
              $scope.formConfig.params = surf;
            })
            .catch(function () {
              //TODO: We should alert the user somehow the session was not found
              $state.go('main');
            });
        } else {
          loadDefaultSession();
        }
      };

      var loadDefaultSession = function () {
        var today = new Date();
        $scope.formConfig.params = {
          sessionDate: new Date(today.getFullYear(),
                                today.getMonth(),
                                today.getDate(),
                                today.getHours(),
                                today.getMinutes()),
          sessionHours: 2,
          waveQuality: 3,
          hollowness: 3,
          funFactor: 3,
          crowdedness: 3,
          otherFriends: 0
        };
      };

      var getDefaultResource = function (resources) {
        resources = Array.isArray(resources) ? resources : [];
        var defaultResource = _.findWhere(resources, {default: true});
        return !!defaultResource ? defaultResource._id : undefined;
      };

      var loadResources = function () {
        Board.load().then(function (boards) {
          $scope.boards = boards;
          $scope.formConfig.params.board_id = getDefaultResource(boards);
        });

        SurfSpot.load().then(function (surfSpots) {
          $scope.surfSpots = surfSpots;
          $scope.formConfig.params.surfSpot_id = getDefaultResource(surfSpots);
        });
      };

      var handleSuccess = function () {
        $state.go('surfs.review');
      };

      var handleError = function () {
        // TODO: handle error
      };
      $scope.saveSurf = function (form) {
        if (form.$valid) {
          if ($scope.formConfig.mode === 'add') {
            Surf.create($scope.formConfig.params).then(handleSuccess,
              handleError);
          } else if ($scope.formConfig.mode === 'edit') {
            Surf.update($scope.formConfig.params, $scope.formConfig.params._id)
              .then(handleSuccess, handleError);
          }
        }
      };
      
      initialize();
  });
