'use strict';

angular.module('hackathonApp')
  .controller('ResetPasswordCtrl', function ($scope, $stateParams, Auth) {
    // TODO: everything having to do with alerts should be in a root scope
    // TODO: that other scopes are nested under
    var token = $stateParams.token;
    
    var initialize = function () {
      $scope.user = {};
      $scope.alerts = [];
      $scope.user.tokenValid = false;
      checkToken();
    };

    var checkToken = function () {
      Auth.validateResetToken(token).then(function () {
        $scope.user.tokenValid = true;
      }, function (err) {
        addAlert('danger', err.data.message);
      });      
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    var addAlert = function (type, message) {
      $scope.alerts.push({
        type: type,
        message: message
      });
    };

    var clearAlerts = function () {
      if ($scope.alerts.length) {
        $scope.alerts = [];
      }
    };

    $scope.noMatch = function () {
      var invalid = ($scope.form.password1.$dirty || $scope.form.password2.$dirty) && 
        ($scope.user.password1 !== $scope.user.password2);

      return invalid;
    };

    $scope.resetPassword = function (form) {
      if(form.$valid) {
        
        Auth.resetPasswordWithToken(token, $scope.user.password1, 
          $scope.user.password2)
            .then(function () {
              clearAlerts();
              addAlert('success', 'Your password has been successfully updated.');
            }, function () {
              clearAlerts();
              addAlert('danger', 'Something went wrong.');
            });
      }
    };

    initialize();
  });