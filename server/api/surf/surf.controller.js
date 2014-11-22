'use strict';

var _ = require('lodash');
var Surf = require('./surf.model');

// Get list of surfs
exports.index = function(req, res) {
  Surf.find(function (err, surfs) {
    if(err) { return handleError(res, err); }
    return res.json(200, surfs);
  });
};

// Get a single surf
exports.show = function(req, res) {
  Surf.findById(req.params.id, function (err, surf) {
    if(err) { return handleError(res, err); }
    if(!surf) { return res.send(404); }
    return res.json(surf);
  });
};

// Creates a new surf in the DB.
exports.create = function(req, res) {
  Surf.create(req.body, function(err, surf) {
    if(err) { return handleError(res, err); }
    return res.json(201, surf);
  });
};

// Updates an existing surf in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Surf.findById(req.params.id, function (err, surf) {
    if (err) { return handleError(res, err); }
    if(!surf) { return res.send(404); }
    var updated = _.merge(surf, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, surf);
    });
  });
};

// Deletes a surf from the DB.
exports.destroy = function(req, res) {
  Surf.findById(req.params.id, function (err, surf) {
    if(err) { return handleError(res, err); }
    if(!surf) { return res.send(404); }
    surf.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}