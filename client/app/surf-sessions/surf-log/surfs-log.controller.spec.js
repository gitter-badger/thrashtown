'use strict';

describe('Controller: SurfLogCtrl', function () {

  // load the controller's module
  beforeEach(module('thrashtownApp'));

  var SurfsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SurfsCtrl = $controller('SurfLogCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
