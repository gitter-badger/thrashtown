'use strict';

angular.module('thrashtownApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/settings/settings.html',
        abstract: true,
        authenticate: true
      })
      .state('settings.profile', {
        url: '/profile',
        templateUrl: 'app/settings/profile.html',
        controller: 'ProfileCtrl',
        authenticate: true
      })
      .state('settings.quiver', {
        url: '/quiver',
        templateUrl: 'app/settings/board/quiver.html',
        controller: 'QuiverCtrl',
        authenticate: true
      })
      .state('settings.surfSpots', {
        url: '/surf-spots',
        templateUrl: 'app/settings/surf-spot/surf-spots.html',
        controller: 'SurfSpotsCtrl',
        authenticate: true
      });
  });