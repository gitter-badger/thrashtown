'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Surf = mongoose.model('Surf');


/**
 * Get surf sessions
 */
exports.show = function(req, res) {
  var uId = req.user._id;

  Surf
    .find({user_id: uId})
    .select('surferName user_id surfSpot_id otherFriends waveQuality hollowness funFactor crowdedness board_id sessionDate waterEntryTime waterExitTime comment')
    .exec(function (err, surfs) {
      if (!err) {
        return res.send(200, surfs);
      } else {
        return res.send(err);
      }
    });
};

/**
 * Create surf session
 */
exports.create = function(req, res) {
  var data = req.body;
  data.user_id = req.user._id;
  //TODO: should verify if exists
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