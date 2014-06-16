'use strict';

angular.module('hackathonApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    
    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/login');
      });
    };
    
  });
