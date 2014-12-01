'use strict';

angular.module('thrashtownApp')
  .controller('ForgotPasswordCtrl', function ($scope, Auth) {
    // TODO: everything having to do with alerts should be in a root scope
    // TODO: that other scopes are nested under
    $scope.user = {};
    $scope.alerts = [];

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    var addAlert = function (type, message) {
      $scope.alerts.push({
        type: type,
        message: message
      });
    };

    $scope.requestPasswordReset = function (form) {
      if(form.$valid) {
        if ($scope.alerts.length) {
          $scope.alerts = [];
        }
        
        Auth.requestPasswordReset($scope.user.email)
          .then(function () {
            addAlert('success', 'A password reset link has been sent to your email.');
          }, function (err) {
            //TODO: review this error handler
            addAlert('danger', err.data.message);
          });
      }
    };
  });