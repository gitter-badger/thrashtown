'use strict';

angular.module('thrashtownApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ui.select'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $state, Alert, Auth) {
    // Add state to the rootScope for 'activate' class in navbar and sidebars 
    $rootScope.$state = $state;
    var bypassAuthCheck = false;

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next, toParams) {
      // TODO: Seems a bit weird to handle this here, might be better to 
      // listen for $stateChangeStart in the alert service and do this
      Alert.closeAll();

      if (!next.authenticate || (next.authenticate && bypassAuthCheck)) {
        return;
      }

      event.preventDefault();

      Auth.isLoggedInAsync(function (loggedIn) {
        if (!loggedIn) {
          bypassAuthCheck = false;
          $state.go('login');
        } else {
          bypassAuthCheck = true;
          $state.go(next, toParams);
        }
      });

    });
  }); 
  