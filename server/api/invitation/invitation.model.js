'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var InvitationSchema = new Schema({
  invitedBy: {type: Schema.Types.ObjectId, ref: 'User'}
});

InvitationSchema.plugin(timestamps);

module.exports = mongoose.model('Invitation', InvitationSchema);
