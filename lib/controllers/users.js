'use strict';

var crypto = require('crypto'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    spots = require('../config/surfSpotsData'),
    config = require('../config/config'),
    User = mongoose.model('User');

var sendgrid = require('sendgrid')(config.sendGridUsername, 
  config.sendGridPassword);

/**
 * Create user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.surfSpots = spots.surfSpots;
  newUser.save(function(err) {
    if (err) return res.json(400, err);
    
    req.logIn(newUser, function(err) {
      if (err) return next(err);

      return res.json(req.user.userInfo);
    });
  });
};

/**
 *  Get profile of specified user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(404);

    res.send({ profile: user.profile });
  });
};

/**
 * Change password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return res.send(400);

        res.send(200);
      });
    } else {
      res.send(403);
    }
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
        message: 'Sorry, we don\'t know that email.  Try again?'
      });
    }
    
    // TODO: should all this live in the controller?
    crypto.randomBytes(20, function(err, buf) {
      if (err) {
        throw err;
      }
      var token = buf.toString('hex');
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000 * 24; // 24 hours
      console.log(token);
      user.save(function(err) {
        if (err) {
          return res.send(400);
        }
        
        var payload   = {
          to      : user.email,
          from    : 'admin@thrashtown.com',
          subject : 'Reset your Thrashtown password!',
          text    : 'Well hello there my good thrashtowner! Open this link to reset your password for Thrashtown. www.thrashtown.com/forgot-password/' + token
        };

        sendgrid.send(payload, function(err, json) {
          if (err) {
            console.error(err);
            return res.status(400).send({
              message: 'Your email bounced.',
              code: 'invalid_email'
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
        code: 'invalid_token'
      });
    }

    if (user.resetPasswordExpires < Date.now()) {
      return res.status(400).send({
        message: 'The password reset link has expired.',
        code: 'expired_token'
      });
    }
    
    // Token found and valid, proceed with reset
    var sendgrid = 

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
        code: 'invalid_token'
      });
    }

    if (user.resetPasswordExpires < Date.now()) {
      return res.status(400).send({
        message: 'The password reset link has expired.',
        code: 'expired_token'
      });
    }
    
    var password1 = String(req.body.password1);
    var password2 = String(req.body.password2);
    if (password1 === password2) {
      user.password = password1;
      user.save(function(err) {
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
 * Get current user
 */
exports.me = function(req, res) {
  res.json(req.user || null);
};
