'use strict';

var _ = require('lodash');
var Invitation = require('./invitation.model');
var User = require('../user/user.model');

// Get list of invitations
exports.index = function(req, res) {
  Invitation.find(function (err, invitations) {
    if(err) { return handleError(res, err); }
    return res.json(200, invitations);
  });
};

// Get a single invitation
exports.show = function(req, res) {
  Invitation.findById(req.params.id, function (err, invitation) {
    if(err) { return handleError(res, err); }
    if(!invitation) { return res.send(404); }
    return res.json(invitation);
  });
};

// Creates a new invitation in the DB.
exports.create = function(req, res, next) {
  var invitedUserId = req.body;
  var invitingUserId = req.user._id;

  User.findById(invitedUserId, function (err, invitedUser) {
    if (err) {
      return next(err);
    }
    
    if (!invitedUser) {
      // No user exists.
      return res.send(404);
    }
    
    var invited = invitedUser.invitations.some(function (invitation) {
      return invitation.equals(invitingUserId);
    });

    if (invited) {
      // TODO: need to message to the user that an invitation already exists
      return res.send(200);
    } else {
      // invitedUser.invitations.push(invitingUserId);
      Invitation.create(req.body, function(err, invitation) {
        if (err) { 
          return handleError(res, err); 
        }
        invitedUser.invitations.push(invitation);
        return res.json(201, invitation);
      });
    }
  });
};

// Updates an existing invitation in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Invitation.findById(req.params.id, function (err, invitation) {
    if (err) { return handleError(res, err); }
    if(!invitation) { return res.send(404); }
    var updated = _.merge(invitation, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, invitation);
    });
  });
};

// Deletes a invitation from the DB.
exports.destroy = function(req, res) {
  Invitation.findById(req.params.id, function (err, invitation) {
    if(err) { return handleError(res, err); }
    if(!invitation) { return res.send(404); }
    invitation.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}