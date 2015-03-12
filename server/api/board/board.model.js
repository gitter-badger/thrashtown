'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Board Schema
 */
var BoardSchema = new Schema({
  name: String,
  default: {
    type: Boolean,
    default: false
  },
  size: String,
  category: String,
  notes: String
});

/**
 * Validations
 */
BoardSchema.path('size').validate(function (value) {
  var boardSizeRegexp = /^[1-9][0-9]?'(?:1[0-1]|[0-9])"$/;
  return boardSizeRegexp.test(value);
}, 'Board Size must be in the format of <feet>\'<inches>\" (i.e. 6\'3\" or 7\'0\").');

// module.exports = mongoose.model('Board', BoardSchema);
// exports.BoardSchema = BoardSchema;
