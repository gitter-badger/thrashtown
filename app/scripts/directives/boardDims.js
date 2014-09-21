'use strict';

angular.module('hackathonApp')

  /**
   * Custom attribute for text input to validate board size
   */
  .directive('boardDims', function() {
    var boardSizeRegexp = /^[1-9][0-9]?'(?:1[0-1]|[0-9])"$/;
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        ctrl.$parsers.unshift(function(viewValue) {
          if (boardSizeRegexp.test(viewValue)) {
            // it is valid
            ctrl.$setValidity('board-dims', true);
            return viewValue;
          } else {
            // it is invalid, return undefined (no model update)
            ctrl.$setValidity('board-dims', false);
            return undefined;
          }
        });
      }
    };
  });