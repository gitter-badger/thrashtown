'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Surf Schema
 */
var SurfSchema = new Schema({
  name: String,
  info: String,
  sessionDate: {
    type: Date,
    default: Date.now
  },
  awesomeness: Number
});

/**
 * Validations
 */
SurfSchema.path('awesomeness').validate(function (num) {
  return num >= 1 && num <= 10;
}, 'Awesomeness must be between 1 and 10');

mongoose.model('Surf', SurfSchema);
