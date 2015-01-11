'use strict';

angular.module('thrashtownApp')
  .controller('ResetPasswordCtrl', 
    function ($scope, $stateParams, $sce, Alert, Auth) {
      var token = $stateParams.token;
      var initialize = function () {
        $scope.user = {};
        $scope.user.tokenValid = false;
        checkToken();
      };

      var checkToken = function () {
        Auth.validateResetToken(token).then(function () {
          $scope.user.tokenValid = true;
        }, function () {
          Alert.add('danger', 
            'Invalid token, try <a class="alert-link" ' +
            'href="/forgot-password">resetting</a> your password again.');
        });
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
                Alert.closeAll();
                Alert.add('success', 'Your password has been updated, you ' + 
                  'may now <a class="alert-link" href="/login">Login</a>');
              }, function () {
                Alert.closeAll();
                Alert.add('danger', 'Something went wrong, try <a class=' +
                  '"alert-link" href="/forgot-password">resetting</a> your ' + 
                  'password again.');
              });
        }
      };

      initialize();
    });
