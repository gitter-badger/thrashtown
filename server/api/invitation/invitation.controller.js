'use strict';

var _ = require('lodash');
var User = require('../user/user.model');
var config = require('../../config/environment');
var sendgrid = require('sendgrid')(config.sendGridUsername, 
  config.sendGridPassword);

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

  // TODO: we should also verify the invitingUser exists
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
      return res.json(200, {
        code: 'ALREADY_INVITED', 
        message: 'You have already invited this user to be friends.'
      });
    } else if (alreadyFriends) {
      // TODO: need a better, standard practice for this type of thing
      return res.json(200, {
        code: 'ALREADY_FRIENDS', 
        message: 'You are already friends with this user.'
      });
    } else {
      invitedUser.invitations.push(invitingUserId);
      invitedUser.save(function(err, user) {
        if (err) { 
          return handleError(res, err); 
        }

        var payload   = {
          to: user.email,
          from: 'admin@thrashtown.com',
          fromname: 'Thrashtown',
          subject : 'You have a Thrashtown friend request!',
          html: '<h2>Friend Request!</h2>' +
                '<p>The user <strong>' + req.user.name + ' (' + req.user.email + 
                ')</strong> just invited you to connect on Thrashtown. ' + 
                'Accept or reject the invitation here: ' +
                'www.thrashtown.com/settings/friends</p><p>Happy Thrashing!</p>'
        };

        sendgrid.send(payload, function (err, json) {
          // TODO: should we notify user email success/failure?
          return;
        });

        return res.json(201, user.profile);
      });
    }
  });
};

exports.respondToInvitation = function (req, res) {
  // Remember that as implemented, the invitedUser has the pending invitation 
  // in `invitations`.  When they accept, we should:
  //    1. Verify the invited user really has that inviation  
  //    2. Add the inviting user to their friends array
  //    3. Also add the invited user to the friends array of the inviting user
  //    4. Delete the invitation from the invited user's invitation array
  var invitedUserId = req.user._id;
  var invitingUserId = req.params.id;
  var acceptInvitation = req.body.acceptInvitation;
  User.findById(invitedUserId, function (err, invitedUser) {
    if (err) {
      return handleError(res, err);
    }
    
    var invitationIndex = -1;
    if (!!invitedUser) {
      invitationIndex = invitedUser.invitations.indexOf(invitingUserId);
    }
    
    if (!invitedUser || invitationIndex === -1) {
      return res.send(404);
    }

    if (!acceptInvitation) {
      invitedUser.invitations.remove(invitingUserId);
      invitedUser.save(function (err, user) {
        if (err) {
          return handleError(res, err);
        }
  
        return res.json(200, {
          type: 'warning',
          code: 'INVITATION_REJECTED',
          message: 'You have rejected the invitation to connect.'
        });
      });
    } else {
    // Invited users exists and actually has that inviation POSTed, and wants
    // to accept the invitatio - proceed...
      User.findById(invitingUserId, function (err, invitingUser) {
        if (err) {
          return handleError(res, err);
        }

        // First delete the invitation because whatever the outcome (i.e. 
        // user doesn't exist, or accepting) we'll want to delete it      
        invitedUser.invitations.remove(invitingUserId);
        
        if (!invitingUser) {
          return res.send(404);
        }
        
        var alreadyFriends1 = invitedUser.friends.some(function (friend) {
          return friend.equals(invitingUserId);
        });

        if (!alreadyFriends1) {
          invitedUser.friends.push(invitingUserId);
        }

        var alreadyFriends2 = invitingUser.friends.some(function (friend) {
          return friend.equals(invitedUserId);
        });
        
        if (!alreadyFriends2) {
          invitingUser.friends.push(invitedUserId);
        }

        invitedUser.save(function (err) {
          if (err) { 
            return handleError(res, err); 
          }
          invitingUser.save(function (err, user) {
            if (err) { 
              return handleError(res, err); 
            }
            var payload   = {
              to: user.email,
              from: 'admin@thrashtown.com',
              fromname: 'Thrashtown',
              subject : 'Your friend accepted your invitation to connect!',
              html: '<h2>Friend Request Accepted!</h2>' +
                    '<p>Your friend <strong>' + invitedUser.name + ' (' + 
                    invitedUser.email + ')</strong> just accepted your ' + 
                    'invitation to connect on Thrashtown.  You may now ' + 
                    'start tagging them in sessions here: ' +
                    'www.thrashtown.com/surfs/create</p><p>Also ' +
                    'remember you can tag them in any old sessions logged by ' +
                    'editing those sessions.</p><p>Happy Thrashing!</p>'
            };

            sendgrid.send(payload, function (err, json) {
              // TODO: should we notify user email success/failure?
              return;
            });              
            return res.json(200, user.profile);
          });
        });

      });
    }

  });


};

// Deletes a invitation from the DB.
// TODO:
// exports.destroy = function(req, res) {
//   // TODO: change this
//   Invitation.findById(req.params.id, function (err, invitation) {
//     if(err) { return handleError(res, err); }
//     if(!invitation) { return res.send(404); }
//     invitation.remove(function(err) {
//       if(err) { return handleError(res, err); }
//       return res.send(204);
//     });
//   });
// };

function handleError(res, err) {
  return res.send(500, err);
}
