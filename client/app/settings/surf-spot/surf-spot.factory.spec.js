'use strict';

describe('Factory: surfSpot', function () {

  // load the service's module
  beforeEach(module('thrashtownApp'));

  // instantiate service
  var SurfSpot;
  beforeEach(inject(function (_SurfSpot_) {
    SurfSpot = _SurfSpot_;
  }));

  it('should do something', function () {
    expect(!!SurfSpot).toBe(true);
  });

});
