'use strict';

angular.module('hackathonApp')
  .controller('DashboardCtrl', function ($scope, $http) {
    $scope.errors = {};

    $http({
      method: 'GET',
      url: 'api/surfs',
    })
    .then(function(data) {
      var sessions = data.data;
      var storage = {
        boards: {},
        surfs: {}
      };
      for (var i = 0; i < sessions.length; i++) {
        var session = sessions[i];
        var board = session.board;
        var mon = new Date(session.sessionDate);
        var monStart = new Date(mon.getFullYear(), mon.getMonth(), 1);
        if (storage.boards[board] === undefined) {
          storage.boards[board] = 0;
        }
        storage.boards[board] += 1;
               
        if (storage.surfs[monStart] === undefined) {
          storage.surfs[monStart] = 0;
        }
        storage.surfs[monStart] += 1;
      }

      $scope.boards = _.map(storage.boards, function(count, board) {
        return {key: board, y: count};
      });

      $scope.exampleData = [{key: 'Sessions by Month'}];
      $scope.exampleData[0].values = _.map(storage.surfs, function(count, mon) {
        return [new Date(mon), count];
      });

      // console.log($scope.exampleData);

      $scope.xAxisTickFormatFunction = function(){
        return function(d) {
          return d3.time.format('%Y-%m-%d')(new Date(d));
        };
      };

      $scope.xFunction = function(){
        return function(d) {
            return d.key;
        };
      };
      
      $scope.yFunction = function(){
        return function(d) {
            return d.y;
        };
      };

      $scope.descriptionFunction = function(){
        return function(d){
            return d.key;
        };
      };

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