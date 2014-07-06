'use strict';

var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;
    
/**
 * Surf Schema
 */
var SurfSchema = new Schema({
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  otherFriends: {type: Number, default: 0, required: false},
  waveQuality: {type: Number, default: 3, min: 1, max: 5, required: false},
  hollowness: {type: Number, default: 3, min: 1, max: 5, required: false},
  funFactor: {type: Number, default: 3, min: 1, max: 5, required: false},
  crowdedness: {type: Number, min: 1, max: 5, required: false},
  board_id: {type: Schema.Types.ObjectId, ref: 'Board', required: true},
  surfSpot_id: {type: Schema.Types.ObjectId, ref: 'SurfSpot', required: true},
  comment: {type: String, required: false},
  sessionDate: {type: Date, required: false},
  waterEntryTime: {type: String, required: false}, //TODO:
  waterExitTime:  {type: String, required: false} //TODO:
}, {
  collection: 'surfs' // bug with Mongoose pluralizing 'surf' to 'surves', so define explicitly
});

SurfSchema.plugin(timestamps);

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


mongoose.model('Surf', SurfSchema);
