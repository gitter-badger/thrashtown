'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('thrashtownApp'));

  var LoginCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;

    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope
    });
  }));

  //TODO: some actual tests
  it('should have a user object on the scope', function () {
    expect(scope.user).toEqual({});
  });
});
