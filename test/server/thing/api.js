'use strict';

var should = require('should'),
    app = require('../../../server'),
    request = require('supertest');

describe('GET /api/surfs', function() {
  
  xit('should respond with JSON array', function(done) {
    request(app)
      .get('/api/surfs')
      .expect(401)
      // .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        // res.body.should.be.instanceof(Array);
        done();
      });
  });
});