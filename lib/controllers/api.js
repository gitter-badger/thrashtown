'use strict';

var mongoose = require('mongoose'),
    Surf = mongoose.model('Surf');

/**
 * Get surf sessions
 */
exports.surfs = function(req, res) {
  return Surf.find(function (err, surfs) {
    if (!err) {
      return res.json(surfs);
    } else {
      return res.send(err);
    }
  });
};