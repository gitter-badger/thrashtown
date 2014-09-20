'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Surf = mongoose.model('Surf');

//TODO: Make into multi-line for readability
var queryFields = 'user_id surfSpot_id otherFriends waveQuality hollowness funFactor crowdedness board_id sessionDate sessionHours comment';

/**
 * Create a surf session
 */
exports.create = function (req, res) {
  var data = req.body;
  data.user_id = req.user._id;
  
  var newSurf = new Surf(data);
  
  newSurf.save(function(err, data) {
    if (!err) {
      console.log('Successfully saved surf session to db.');
      res.send(200, data);
    } else {
      console.log('Error saving surf session to db.');
      return res.send(400, err);
    }
  });
};

/**
 * Get surf sessions
 */
exports.read = function (req, res) {
  var data = req.body;
  var requestUserId = req.user._id;
  var surfId = req.params.id;
  
  Surf
    .findOne({_id: surfId})
    .select(queryFields)
    .exec(function (err, surf) {
      if (!err) {
        res.send(200, surf);
      } else if (!surf.user_id.equals(requestUserId)) {
        res.send(403, 'The surf session requested does not belong to you');
      } else {
        res.send(err);
      }
    });
};

/**
 * Get surf sessions
 */
exports.readAll = function (req, res) {
  var uId = req.user._id;

  Surf
    .find({user_id: uId})
    .select(queryFields)
    .exec(function (err, surfs) {
      if (!err) {
        return res.send(200, surfs);
      } else {
        return res.send(400, err);
      }
    });
};

/**
 * Update a surf session
 */
exports.update = function (req, res, next) {
  var data = req.body;
  var requestUserId = req.user._id;
  var surfId = req.params.id;

  //TODO: I think I an just do Surf.findOneAndModify({_id: id, user_id: requestUserID}), would
  //TODO: be better / simpler
  Surf.findById(surfId, function (err, surf) {
    if (err) {
      return next(err);
    }

    if (!surf.user_id.equals(requestUserId)) {
      return res.send(403, 'That surf session does not belong to you');
    }

    //TODO: Probably a better way to do this, I'm doing this now because I think
    //TODO: there was some other stuff in data, not sure.
    surf.sessionDate = data.sessionDate;
    surf.sessionHours = data.sessionHours;
    surf.surfSpot_id = data.surfSpot_id;
    surf.otherFriends = data.otherFriends;
    surf.waveQuality = data.waveQuality;
    surf.hollowness = data.hollowness;
    surf.crowdedness = data.crowdedness;
    surf.funFactor = data.funFactor;
    surf.board_id = data.board_id;
    surf.comment = data.comment;

    surf.save(function (err) {
      if (err) {
        return res.send(400, err);
      }

      res.send(200);
    });
  });
};

/**
 * Delete a surf session
 */
exports.delete = function (req, res) {
  var data = req.body;
  var requestUserId = req.user._id;
  var surfId = req.params.id;

  Surf.remove({_id: surfId, user_id: requestUserId}, function (err) {
    if (!err) {
      console.log('Successfully deleteddd surf session.');
      res.send(200);
    } else {
      console.log('Error deleting surf session.');
      res.send(400, 'Error deleting surf session.');
    }
  });
};
