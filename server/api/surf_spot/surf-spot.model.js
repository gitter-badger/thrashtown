'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Surf Spot Schema
 */
var SurfSpotSchema = new Schema({
  name: String,
  region: String,
  default: {
    type: Boolean,
    default: false
  },
  private: {
    type: Boolean,
    default: false
  },
  lat: {
    type: Number,
    default: null
  },
  long: {
    type: Number,
    default: null
  },
  notes: String
});

// module.exports = mongoose.model('SurfSpot', SurfSpotSchema);
// exports.SurfSpotSchema = SurfSpotSchema;
