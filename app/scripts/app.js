'use strict';

angular.module('hackathonApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    
    $locationProvider.html5Mode(true);
    // $urlRouterProvider.when('/', '/login');
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'partials/login',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'partials/signup',
        controller: 'SignupCtrl'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'partials/settings',
        controller: 'SettingsCtrl',
        abstract: true,
        authenticate: true
      })
      .state('settings.account', {
        url: '/account',
        templateUrl: 'partials/account',
        controller: 'AccountCtrl',
        authenticate: true
      })
      .state('settings.quiver', {
        url: '/quiver',
        templateUrl: 'partials/quiver',
        controller: 'QuiverCtrl',
        authenticate: true
      })
      .state('surf', {
        url: '/surf',
        templateUrl: 'partials/createsurf',
        controller: 'CreateSurfCtrl',
        authenticate: true
      })
      .state('surfs', {
        url: '/surfs',
        templateUrl: 'partials/surfsessionstable',
        controller: 'SurfSessionsTableCtrl',
        authenticate: true        
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'partials/dashboard',
        controller: 'DashboardCtrl',
        authenticate: true        
      });
      
    // Intercept 401s and redirect you to login
    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
      return {
        'responseError': function(response) {
          if(response.status === 401) {
            $location.path('/login');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    }]);
  })
  .run(function ($rootScope, $state, $location, Auth) {

    // Add state to the rootScope for 'activate' class in navbar and sidebars 
    $rootScope.$state = $state;

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      
      if (next.authenticate && !Auth.isLoggedIn()) {
        $location.path('/login');
      }
    });
  });