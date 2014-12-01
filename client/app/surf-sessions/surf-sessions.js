'use strict';

angular.module('thrashtownApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('surfs', {
        url: '/surfs',
        templateUrl: 'app/surf-sessions/surf-sessions-base.html',
        abstract: true,
        authenticate: true
      })
      .state('surfs.create', {
        url: '/create',
        templateUrl: 'app/surf-sessions/surf-log/surf-log.html',
        controller: 'SurfLogCtrl',
        authenticate: true
      })
      .state('surfs.edit', {
        url: '/edit/:id',
        templateUrl: 'app/surf-sessions/surf-log/surf-log.html',
        controller: 'SurfLogCtrl',
        authenticate: true
      })
      .state('surfs.review', {
        url: '/review',
        templateUrl: 'app/surf-sessions/review/review.html',
        controller: 'ReviewSurfsCtrl',
        authenticate: true
      });
  });