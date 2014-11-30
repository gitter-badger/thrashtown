'use strict';

describe('Controller: ReviewSurfsCtrl', function () {

  // load the controller's module
  beforeEach(module('thrashtownApp'));

  var ReviewCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReviewCtrl = $controller('ReviewCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
