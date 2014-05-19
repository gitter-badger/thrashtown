'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('hackathonApp'));

  var MainCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/surfs')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of surfs to the scope', function () {
    expect(scope.surfs).toBeUndefined();
    $httpBackend.flush();
    expect(scope.surfs.length).toBe(4);
  });
});
