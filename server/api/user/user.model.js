'use strict';

var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;
// var BoardSchema = require('../board/board.model');
// var SurfSpotSchema = require('../surf_spot/surf-spot.model');

/**
 * Board Schema
 */
var BoardSchema = new Schema({
  name: String,
  default: {
    type: Boolean,
    default: false
  },
  size: String,
  category: String,
  notes: String
});

/**
 * Board Schema Validations
 */
BoardSchema.path('size').validate(function (value) {
  var boardSizeRegexp = /^[1-9][0-9]?'(?:1[0-1]|[0-9])"$/;
  return boardSizeRegexp.test(value);
}, 'Board Size must be in the format of <feet>\'<inches>\" (i.e. 6\'3\" or 7\'0\").');

/**
 * Surf Spot Schema
 */
var SurfSpotSchema = new Schema({
  name: String,
  region: String,
  default: {
    type: Boolean,
    default: false
  },
  private: {
    type: Boolean,
    default: false
  },
  lat: {
    type: Number,
    default: null
  },
  long: {
    type: Number,
    default: null
  },
  notes: String
});

/**
 * User Schema
 */
var UserSchema = new Schema({
  name: String,
  email: { type: String, lowercase: true },
  role: {
    type: String,
    default: 'user'
  },
  hashedPassword: String,
  provider: String,
  salt: String,
  boards: [BoardSchema],
  surfSpots: [SurfSpotSchema],
  invitations: [{type: Schema.Types.ObjectId, ref: 'User'}],
  friends: [{type: Schema.Types.ObjectId, ref: 'User'}],
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

/**
 * Virtuals
 */
UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// Public profile information
UserSchema
  .virtual('profile')
  .get(function () {
    return {
      'name': this.name,
      'role': this.role
    };
  });

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(function () {
    return {
      '_id': this._id,
      'role': this.role
    };
  });

/**
 * Validations
 */

// Validate empty email
UserSchema
  .path('email')
  .validate(function (email) {
    return email.length;
  }, 'Email cannot be blank');

// Validate empty password
UserSchema
  .path('hashedPassword')
  .validate(function (hashedPassword) {
    return hashedPassword.length;
  }, 'Password cannot be blank');

// Validate email is not taken
UserSchema
  .path('email')
  .validate(function (value, respond) {
    var self = this;
    this.constructor.findOne({email: value}, function (err, user) {
      if (err) throw err;
      if (user) {
        if (self.id === user.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
}, 'The specified email address is already in use.');

var validatePresenceOf = function (value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function (next) {
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.hashedPassword))
      next(new Error('Invalid password'));
    else
      next();
  });

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function () {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function (password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

module.exports = mongoose.model('User', UserSchema);
// mongoose.model('User.boards', BoardSchema);
// mongoose.model('User.surfSpots', SurfSpotSchema);
