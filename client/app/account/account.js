'use strict';

angular.module('thrashtownApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('forgotPassword', {
        url: '/forgot-password',
        templateUrl: 'app/account/forgot-password/forgot-password.html',
        controller: 'ForgotPasswordCtrl'
      })
      .state('resetPassword', {
        url: '/forgot-password/:token',
        templateUrl: 'app/account/forgot-password/reset-password.html',
        controller: 'ResetPasswordCtrl'
      });
  });