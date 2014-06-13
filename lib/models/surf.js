'use strict';

var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;
    
/**
 * Surf Schema
 */
var SurfSchema = new Schema({
  surferName: {type: String, requred: false},
  user_id: {type: Schema.Types.ObjectId, ref: 'User'}, //TODO:
  location: {type: String, requred: false},
  locationRollup: {type: String, requred: false},
  otherFriends: {type: Number, default: 0, requred: false},
  waveQuality: {type: Number, default: 3, min: 1, max: 5, requred: false},
  hollowness: {type: Number, default: 3, min: 1, max: 5, requred: false},
  funFactor: {type: Number, default: 3, min: 1, max: 5, requred: false},
  crowdedness: {type: Number, min: 1, max: 5, requred: false},
  board: {type: String, requred: false}, //TODO:
  comment: {type: String, requred: false}, //TODO:
  sessionDate: {type: Date, default: Date.now, required: false},
  waterEntryTime: {type: String, required: false}, //TODO:
  waterExitTime:  {type: String, required: false} //TODO:
}, {
  collection: 'surfs' // bug with Mongoose pluralizing 'surf' to 'surves'
});

SurfSchema.plugin(timestamps);

/**
 * Validations
 */
// SurfSchema.path('fieldName').validate(function (num) {
//   return num >= 1 && num <= 10;
// }, 'Field Name must be between 1 and 10');

mongoose.model('Surf', SurfSchema);
