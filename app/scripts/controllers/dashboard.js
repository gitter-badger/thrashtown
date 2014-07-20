'use strict';

angular.module('hackathonApp')
  .controller('DashboardCtrl', function ($scope, $rootScope) {
    // var today = new Date();
    // $scope.startDate = new Date(today.getFullYear(), 0, 1);
    // $scope.endDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    var statsByDayArr = [];
    var statsByMonthArr = [];

    // TODO: WIP
    // var statsByDayArrFiltered = [];
    // var statsByMonthArrFiltered = [];

    // var filterSessions = function(start, end) {


    // };

    var loadSurfSessions = function() {
      var statsByDayObj = {};
      var statsByMonthObj = {};
      for (var i = 0; i < $scope.surfs.length; i++) {
        var dayKey = $scope.surfs[i].sessionDate.slice(0, 10);
        var monthKey = $scope.surfs[i].sessionDate.slice(0, 7) + '-01';
        if (!statsByDayObj[dayKey]) {
          statsByDayObj[dayKey] = 0;
        }
        if (!statsByMonthObj[monthKey]) {
          statsByMonthObj[monthKey] = 0;
        }
        statsByDayObj[dayKey] += 1;
        statsByMonthObj[monthKey] += 1;
      }

      for (var day in statsByDayObj) {
        statsByDayArr.push({date: day, total: statsByDayObj[day]});
      }

      for (var month in statsByMonthObj) {
        statsByMonthArr.push({date: month, total: statsByMonthObj[month]});
      }

      var sortByKey = function(objectsArr, key) {
        objectsArr.sort(function(a, b) {
          if (a[key] > b[key]) {
            return 1;
          } else if (a[key] < b[key]) {
            return -1;
          } else {
            return 0;
          }
        });
      };

      sortByKey(statsByDayArr, 'date');
      sortByKey(statsByMonthArr, 'date');
      $scope.chartData = statsByMonthArr;
    };
    
    // TODO: revisit this implementation need a way to 'finish' load
    // in resolve so I don't have to do this
    if ($scope.surfs) {
      loadSurfSessions();
    } else {
      $rootScope.$on('surfSessionsLoaded', loadSurfSessions);
    }

  });