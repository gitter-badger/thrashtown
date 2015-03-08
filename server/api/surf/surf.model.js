'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');
var idvalidator = require('mongoose-id-validator');

/**
 * Surf Schema
 */
var SurfSchema = new Schema({
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  otherFriends: {type: Number, default: 0, required: true},
  friends: [{type: Schema.Types.ObjectId, ref: 'User'}],
  waveQuality: {type: Number, default: 3, min: 1, max: 5, required: true},
  hollowness: {type: Number, default: 3, min: 1, max: 5, required: true},
  funFactor: {type: Number, default: 3, min: 1, max: 5, required: true},
  crowdedness: {type: Number, min: 1, max: 5, required: true},
  board_id: {type: Schema.Types.ObjectId, ref: 'Board', required: true},
  surfSpot_id: {type: Schema.Types.ObjectId, ref: 'SurfSpot', required: true},
  comment: {type: String, required: false},
  sessionDate: {type: Date, required: true},
  sessionHours:  {type: Number, default: 2, required: true}
}, {
  collection: 'surfs' // bug with Mongoose pluralizing 'surf' to 'surves', so define explicitly
});

// Provides createdAt and updatedAt timestamps on creation and modifcation
SurfSchema.plugin(timestamps);

// Validate friends and boards
SurfSchema.plugin(idvalidator);

/**
 * Validations
 */
SurfSchema.path('waveQuality').validate(function (num) {
  return num >= 1 && num <= 5;
}, 'Field Name must be between 1 and 5');

SurfSchema.path('hollowness').validate(function (num) {
  return num >= 1 && num <= 5;
}, 'Field Name must be between 1 and 5');

SurfSchema.path('funFactor').validate(function (num) {
  return num >= 1 && num <= 5;
}, 'Field Name must be between 1 and 5');

SurfSchema.path('crowdedness').validate(function (num) {
  return num >= 1 && num <= 5;
}, 'Field Name must be between 1 and 5');


module.exports = mongoose.model('Surf', SurfSchema);
