'use strict';

var _ = require('lodash');
var User = require('../user/user.model');

exports.index = function (req, res, next) {
  var userId = req.user._id;

  User.findById(userId, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send(404);
    }

    res.json(200, user.surfSpots);
  });
};

exports.create = function (req, res, next) {
  var surfSpot = req.body;
  var userId = req.user._id;

  User.findById(userId, function (err, user) {
    if (err) {
      return next(err);
    }
    
    if (!user) {
      return res.send(404);
    }
    if (user.surfSpots.length === 0) {
      // if this is the first spot
      surfSpot.default = true;
    } else if (surfSpot.default === true) {
      // make sure only one spot is the default
      for (var i = 0; i < user.surfSpots.length; i++) {
        if (user.surfSpots[i].default) {
          user.surfSpots[i].default = false;
        }
      }
    }
    user.surfSpots.push(surfSpot);
    user.save(function (err) {
      if (err) {
        return res.send(400);
      }

      //TODO: ideally this would be the newly created spot as saved in the db
      res.json(201, surfSpot);
    });
  });
};

exports.update = function (req, res, next) {
  if (req.body._id) {
    // Do not overwrite the record's _id
    delete req.body._id;
  }
  var data = req.body;
  var userId = req.user._id;
  var surfSpotId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) {
      return next(err);
    }
    
    if (!user) {
      return res.send(404);
    }

    var surfSpot = user.surfSpots.id(surfSpotId);
    if (!surfSpot) {
      return res.send(400);
    }
    
    if (user.surfSpots.length === 1) {
      // if this is the first surfSpot
      data.default = true;
    } else if (data.default === true) {
      // make sure only one surfSpot is the default
      for (var i = 0; i < user.surfSpots.length; i++) {
        if (user.surfSpots[i].default) {
          user.surfSpots[i].default = false;
        }
      }
    }

    var updated = _.merge(surfSpot, data);
    user.save(function (err) {
      if (err) {
        return res.send(400);
      }

      res.json(200, updated);
    });
  });
};

exports.destroy = function (req, res, next) {
  var userId = req.user._id;
  var surfSpotId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) {
      return next(err);
    }
    
    if (!user) {
      return res.send(404);
    }
    var deleted = user.surfSpots.id(surfSpotId).remove();
    user.save(function (err) {
      if (err) {
        return res.send(400);
      }

      res.json(200, deleted);
    });
  });
};
