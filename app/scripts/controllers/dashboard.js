'use strict';

angular.module('hackathonApp')
  .controller('DashboardCtrl', function ($scope, $http) {
    $scope.errors = {};

    $http({
      method: 'GET',
      url: 'api/surfs',
    })
    .then(function(data) {
      // var sessions = data.data;
      // var storage = {};
      // for (var i = 0; i < sessions.length; i++) {
      //   var board = sessions[i].board;
      //   if (storage[board] === undefined) {
      //     storage[board] = 0;
      //   }
      //   storage[board] += 1;
      // }

      // $scope.surfs = storage
      //   ._map(function(count, board) {
      //     return {x: board, y: count};
      //   })
      //   ._sortBy(function(obj) {
      //     return obj.y;
      //   });

      $scope.surfs = [{x: 0, y: 1}, {x: 1, y: 2}, {x:2, y:10}];
      $scope.renderer = 'line';
    })
    .catch( function() {
      //TODO: revisit this
      $scope.errors.other = 'Error with retrieving sessions data.';
    });
  });

// 'surferName'
// 'user_id'
// 'location'
// 'locationRollup'
// 'otherFriends'
// 'waveQuality'
// 'hollowness'
// 'funFactor'
// 'crowdedness'
// 'board'
// 'sessionDate'
// 'waterEntryTime'
// 'waterExitTime'