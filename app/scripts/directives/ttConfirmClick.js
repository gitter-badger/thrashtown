'use strict';

angular.module('hackathonApp')

  /**
   * Custom attribute for confirming clicks
   * http://stackoverflow.com/questions/22113456/modal-confirmation-as-an-angular-ui-directive
   * http://plnkr.co/edit/tvc1u7EJVkyRqfLZEtTq?p=preview
   */
  .directive('ttConfirmClick', function($modal) {

    var modalInstanceCtrl = function($scope, $modalInstance) {
      $scope.ok = function() {
        $modalInstance.close();
      };

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    };

    return {
      restrict: 'A',
      scope: {
        ttConfirmClick:'&'
      },
      link: function (scope, element, attrs) {
        element.bind('click', function () {
          var message = attrs.ttConfirmMessage || 'Are you sure?';

          var modalHtml = '<div class="modal-body"><h4>' + message + '</h4></div>';
          modalHtml += '<div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">OK</button><button class="btn btn-default" ng-click="cancel()">Cancel</button></div>';

          var modalInstance = $modal.open({
            template: modalHtml,
            controller: ['$scope', '$modalInstance', modalInstanceCtrl]
          });

          modalInstance.result.then(function () {
            scope.ttConfirmClick();
          }, function() {
            //Modal dismissed
          });
          
        });
      }
    };
  });
