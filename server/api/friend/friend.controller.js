'use strict';

var _ = require('lodash');
var User = require('../user/user.model');

// Get list of friens invitation for the current user
exports.index = function(req, res) {
  var userId = req.user._id;
  User
    .findById(userId)
    .populate('friends', 'name email')
    .exec(function (err, user) {
    if (err) {
      return handleError(res, err);
    }
    if (!user) {
      return res.send(404);
    }

    res.json(200, user.friends);
  });
};

// Deletes a friend from the DB.
// TODO:
// exports.destroy = function(req, res) {
//   Friend.findById(req.params.id, function (err, friend) {
//     if(err) { return handleError(res, err); }
//     if(!friend) { return res.send(404); }
//     friend.remove(function(err) {
//       if(err) { return handleError(res, err); }
//       return res.send(204);
//     });
//   });
// };

function handleError(res, err) {
  return res.send(500, err);
}