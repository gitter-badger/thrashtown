'use strict';

angular.module('thrashtownApp')
  .controller('ForgotPasswordCtrl', function ($scope, Alert, Auth) {
    $scope.user = {};

    $scope.requestPasswordReset = function (form) {
      if(form.$valid) {
        
        Auth.requestPasswordReset($scope.user.email)
          .then(function () {
            Alert.closeAll();
            Alert.add('success', 'A password reset link has been sent to your email.');
          }, function (err) {
            //TODO: review this error handler
            Alert.closeAll();
            Alert.add('danger', err.data.message);
          });
      }
    };
  });