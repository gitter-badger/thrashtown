'use strict';

var _ = require('lodash');
var User = require('../user/user.model');

// Get list of pending invitation for the current user
exports.index = function(req, res) {
  var userId = req.user._id;
  User
    .findById(userId)
    .populate('invitations', 'name email')
    .exec(function (err, user) {
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
    
    var alreadyInvited = invitedUser.invitations.some(function (invitation) {
      return invitation.equals(invitingUserId);
    });

    var alreadyFriends = invitedUser.friends.some(function (friend) {
      // Note: this works because once friends, both users get added to each
      // other.  Might be better to check the inviting user, too.
      return friend.equals(invitingUserId);
    });

    if (alreadyInvited) {
      // TODO: need a better, standard practice for this type of thing
      return res.send(200, 'You have already invited this user to be friends.');
    } else if (alreadyFriends) {
      // TODO: need a better, standard practice for this type of thing
      return res.send(200, 'You are already friends with this user.');
    } else {
      invitedUser.invitations.push(invitingUserId);
      invitedUser.save(function(err, user) {
        if (err) { 
          return handleError(res, err); 
        }
        return res.json(201, user.profile);
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
