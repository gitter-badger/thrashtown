'use strict';

var _ = require('lodash');
var Invitation = require('./invitation.model');
var User = require('../user/user.model');

// Get list of pending invitation for the current user
exports.index = function(req, res) {
  var userId = req.user._id;
  User.findById(userId, function (err, user) {
    if (err) {
      return handleError(res, err);
    }
    if (!user) {
      return res.send(404);
    }

    res.json(200, user.invitations);
  });
};

// Creates a new invitation by the inviting user for the invited user
exports.create = function(req, res) {
  var invitedUserEmail = req.body.email;
  var invitingUserId = req.user._id;

  User.findOne({email: invitedUserEmail}, function (err, invitedUser) {
    if (err) {
      return handleError(res, err);
    }
    
    if (!invitedUser) {
      // Attempting to invite a user that doesn't exist
      return res.send(404);
    }
    
    var invited = invitedUser.invitations.some(function (invitation) {
      console.log('inside', invitation);
      return invitation.equals(invitingUserId);
    });
    console.log(invited, !!invited);

    if (!!invited) {
      // Attempting to invite a user already invited
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