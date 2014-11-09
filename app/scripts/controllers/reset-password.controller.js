'use strict';

angular.module('hackathonApp')
  .controller('ResetPasswordCtrl', function ($scope, $stateParams, Auth) {
    // TODO: everything having to do with alerts should be in a root scope
    // TODO: that other scopes are nested under
    var token = $stateParams.token;
    
    var initialize = function () {
      $scope.user = {};
      $scope.alerts = {
        success: false,
        failure: false
      };
      $scope.user.tokenValid = false;
      checkToken();
    };

    var checkToken = function () {
      Auth.validateResetToken(token).then(function () {
        $scope.user.tokenValid = true;
      }, function () {
        // TODO: add alert
        // addAlert('danger', err.data.message);
      });
    };

    $scope.closeAlert = function (alert) {
      $scope.alerts[alert] = false;
    };

    var clearAlerts = function () {
      for (var alert in $scope.alerts) {
        $scope.alerts[alert] = false;
      }
    };

    $scope.noMatch = function (form) {
      return !!form && form.password1.$viewValue !==
        form.password2.$viewValue && form.password1.$dirty &&
        form.password2.$dirty;
    };

    $scope.tooShort = function (form) {
      return form.password1.$touched && form.password1.$error.minlength ||
        form.password2.$touched && form.password2.$error.minlength ;
    };

    $scope.resetPassword = function (form) {
      if(form.$valid) {
        
        Auth.resetPasswordWithToken(token, $scope.user.password1,
          $scope.user.password2)
            .then(function () {
              clearAlerts();
              $scope.alerts.success = true;
            }, function () {
              clearAlerts();
              $scope.alerts.failure = true;
            });
      }
    };

    initialize();
  });