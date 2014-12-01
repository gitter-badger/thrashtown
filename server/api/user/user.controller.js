'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var spots = require('../../config/surf-spots-data');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var sendgrid = require('sendgrid')(config.sendGridUsername, 
  config.sendGridPassword);

var validationError = function (res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function (req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if (err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.surfSpots = spots.surfSpots;
  newUser.boards = [];
  newUser.save(function (err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err, user) {
    if (err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function (req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function (err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function (req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function (err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Forgot password
 */
exports.forgotPassword = function (req, res, next) {
  User.findOne({email: req.body.email}, function (err, user) {
    if (err) {
      return next(err);
    }
    
    if (!user) {
      return res.status(400).send({
        message: 'Sorry, we don\'t know that email.  Try again?',
        code: 'auth:unknown_email'
      });
    }
    
    // TODO: This should probably not all live in the controller
    crypto.randomBytes(20, function (err, buf) {
      if (err) {
        throw err;
      }
      var token = buf.toString('hex');
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000 * 24; // 24 hours
      user.save(function (err) {
        if (err) {
          return res.send(400);
        }
        
        var payload   = {
          to      : user.email,
          from    : 'admin@thrashtown.com',
          subject : 'Reset your Thrashtown password!',
          text    : 'Well hello there my good thrashtowner! Open this link to reset your password for Thrashtown. www.thrashtown.com/forgot-password/' + token
        };

        sendgrid.send(payload, function (err, json) {
          if (err) {
            return res.status(400).send({
              message: 'Your email bounced.',
              code: 'auth:invalid_email'
            });
          }
          res.send(200);
        });

      });
    });

  });
};

/**
 * Confirm password reset token
 */
exports.confirmToken = function (req, res, next) {
  User.findOne({resetPasswordToken: req.params.token}, function (err, user) {
    if (err) {
      return next(err);
    }
    
    if (!user) {
      return res.status(400).send({
        message: 'That password reset link is not valid.',
        code: 'auth:invalid_token'
      });
    }

    if (user.resetPasswordExpires < Date.now()) {
      return res.status(400).send({
        message: 'The password reset link has expired.',
        code: 'auth:expired_token'
      });
    }
    
    // Token found and valid, proceed with reset
    res.send(200);
  });
};

/**
 * Reset password with valid reset token
 */
exports.resetPasswordWithToken = function (req, res, next) {
  User.findOne({resetPasswordToken: req.params.token}, function (err, user) {
    if (err) {
      return next(err);
    }
    
    if (!user) {
      return res.status(400).send({
        message: 'That password reset link is not valid.',
        code: 'auth:invalid_token'
      });
    }

    if (user.resetPasswordExpires < Date.now()) {
      return res.status(400).send({
        message: 'The password reset link has expired.',
        code: 'auth:expired_token'
      });
    }
    
    var password1 = String(req.body.password1);
    var password2 = String(req.body.password2);
    if (password1 === password2) {
      user.password = password1;
      // TODO: set to undefined or delete?  What happens with a POST with no data?
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      user.save(function (err) {
        if (err) {
          return res.send(400);
        }

        res.send(200);
      });
    } else {
      // Check for passwords not matching, even though we'll prevent in the client
      res.send(400);
    }

  });
};

/**
 * Authentication callback
 */
exports.authCallback = function (req, res, next) {
  res.redirect('/');
};
