'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
// var User = mongoose.model('User');
var User = require('../user/user.model')
// var Surf = mongoose.model('Surf');
var Surf = require('./surf.model');

var queryFields = 'user_id '+
                  'surfSpot_id '+
                  'otherFriends '+
                  'friends ' +
                  'waveQuality '+
                  'hollowness '+
                  'funFactor '+
                  'crowdedness '+
                  'board_id '+
                  'sessionDate '+
                  'sessionHours '+
                  'comment';

exports.feed = function (req, res) {
  // var userId = req.user._id;
  var userIds = [].concat(req.user.friends);
  // userIds.push(userId);

  Surf
    .find({user_id: {$in: userIds}})
    .populate('user_id', 'name boards surfSpots')
    .populate('friends', 'name')
    .lean()
    .exec(function (err, surfs) {
      if (err) {
        return handleError(res, err);
      }

      // surfs.forEach(function (surf) {
      //   surf.set('boardInfo', surf.user_id.boards.id(surf.board_id), {strict: false});
      //   surf.set('spotInfo', surf.user_id.surfSpots.id(surf.surfSpot_id), {strict: false});
      //   surf = surf.toObject();
      //   delete surf.user_id.boards;
      //   delete surf.user_id.surfSpots;
      // });

      surfs.forEach(function (surf) {
        surf.board = _.find(surf.user_id.boards, function (board) {
          return board._id.toString() === surf.board_id.toString();
        });
        
        surf.surfSpot = _.find(surf.user_id.surfSpots, function (surfSpot) {
          return surfSpot._id.toString() === surf.surfSpot_id.toString();
        });
      });

      // Note: It seems that each surf.user_id shares a reference to the same 
      // object.  Originally, I was deleting this inside the forEach thinking
      // that each surf had it's own user_id object - does not seem to be the
      // case.  Hence this one delete at the end to remove the quiver and spots.
      if (surfs.length > 0) {
        if (!!surfs[0].user_id.boards) {
          delete surfs[0].user_id.boards;
        }
        if (!!surfs[0].user_id.surfSpots) {
          delete surfs[0].user_id.surfSpots;
        }
      }

      return res.json(200, surfs);
    });


};

// Get list of surfs
exports.index = function (req, res) {
  var userId = req.user._id;
  
  Surf
    .find({user_id: userId})
    .select(queryFields)
    .exec(function (err, surfs) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, surfs);
    });
};

// Get a single surf
exports.show = function (req, res) {
  Surf
    .findOne({_id: req.params.id})
    .select(queryFields)
    .exec(function (err, surf) {
      if (err) {
        return handleError(res, err);
      }
      if (!surf || !surf.user_id.equals(req.user._id)) { 
        return res.send(404);
      }
      return res.json(200, surf);
    });

};

exports.create = function (req, res) {
  var data = req.body;
  data.user_id = req.user._id;

  Surf.create(data, function (err, surf) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, surf);
  });
};

exports.update = function (req, res) {
  if (req.body._id) {
    // Do not overwrite the record's _id
    delete req.body._id;
  }
  Surf.findById(req.params.id, function (err, surf) {
    if (err) {
      return handleError(res, err);
    }
    if (!surf) { 
      return res.send(404);
    }
    if (!surf.user_id.equals(req.user._id)) {
      return res.send(403);
    }
    var updated = _.assign(surf, req.body);
    updated.save(function (err) {
      if (err) { 
        return handleError(res, err);
      }
      return res.json(200, updated);
    });
  });
};

exports.destroy = function (req, res) {
  Surf.remove({_id: req.params.id, user_id: req.user._id}, function (err) {
    if (err) {
      return handleError(res, err);
    }
    //TODO: figure out how to pass back the recently deleted item
    //TODO: trying to pass a secound surf argument to the the cb doesn't work
    // res.json(200, surf)
    res.send(200);
  });

};

function handleError(res, err) {
  return res.send(500, err);
}
