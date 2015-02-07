'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    timestamps = require('mongoose-timestamp');

var InvitationSchema = new Schema({
  invitedBy: {type: Schema.Types.ObjectId, ref: 'User'}
});

InvitationSchema.plugin(timestamps);

module.exports = mongoose.model('Invitation', InvitationSchema);