'use strict';

var blurFocusDirective = function ($timeout) {
  return {
    restrict: 'E',
    require: '?ngModel',
    link: function (scope, elm, attr, ctrl) {
      if (!ctrl) {
        return;
      }
      elm.on('focus', function () {
        elm.addClass('has-focus');
        $timeout(function(){
          ctrl.$hasFocus = true;
        });
      });

      elm.on('blur', function () {
        elm.removeClass('has-focus');
        elm.addClass('has-visited');
        $timeout(function(){
          ctrl.$hasFocus = false;
          ctrl.$hasVisited = true;
        });
      });

      elm.closest('form').on('reset submit', function () {
        elm.removeClass('has-visited');
        scope.$apply(function () {
          ctrl.$hasFocus = false;
          ctrl.$hasVisited = false;
        });
      });
    }
  };
};

angular.module('hackathonApp').

  /**
   * Removes server error when user updates input
   */
  directive('input', ['$timeout', blurFocusDirective]).
  directive('select', ['$timeout', blurFocusDirective]);