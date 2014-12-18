'use strict';

angular.module('thrashtownApp')
  .factory('Alert', function ($sce, $rootScope) {
    $rootScope.alerts = [];

    return {
      add: function (type, message) {
        $rootScope.alerts.push({
          type: type,
          message: $sce.trustAsHtml(message),
          close: function (index) {
            $rootScope.alerts.splice(index, 1);
          }
        });
      },
      closeAll: function () {
        if (!!$rootScope.alerts.length) {
          $rootScope.alerts = [];
        }
      }
    };
  });
