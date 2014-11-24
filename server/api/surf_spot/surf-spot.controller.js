'use strict';

var mongoose = require('mongoose');
var User = require('../user/user.model');

exports.index = function (req, res, next) {
  var userId = req.user._id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(404);

    res.send({surfSpots: user.surfSpots });
  });
};

exports.create = function (req, res, next) {
  var data = req.body;
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
      data.default = true;
    } else if (data.default === true) {
      // make sure only one spot is the default
      for (var i = 0; i < user.surfSpots.length; i++) {
        if (user.surfSpots[i].default) {
          user.surfSpots[i].default = false;
        }
      }
    }
    user.surfSpots.push(data);
    user.save(function (err) {
      if (err) {
        return res.send(400);
      }

      res.send(200);
    });
  });
};

exports.update = function (req, res, next) {
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

    surfSpot.name = data.name;
    surfSpot.region = data.region;
    surfSpot.default = data.default;
    surfSpot.private = data.private;
    surfSpot.lat = data.lat;
    surfSpot.lon = data.long;
    surfSpot.notes = data.notes;

    user.save(function (err) {
      if (err) {
        return res.send(400);
      }

      res.send(200);
    });
  });
};

exports.destroy = function (req, res, next) {
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
    user.surfSpots.id(surfSpotId).remove();
    user.save(function (err) {
      if (err) {
        return res.send(400);
      }

      res.send(200);
    });
  });
};
