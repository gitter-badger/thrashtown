'use strict';

describe('Directive: boardDims', function () {

  // load the directive's module
  beforeEach(module('thrashtownApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  xit('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<board-dims></board-dims>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the boardDims directive');
  }));
});