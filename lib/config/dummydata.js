'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Surf = mongoose.model('Surf');

// Populate database with sample application data
var setupSurf = function(uId) {
  Surf.find({}).remove(function() {
    Surf.create({
      "user_id": uId,
      "surferName": "Ramin Taleghani",
      "sessionDate": "2012-06-23T07:00:00.000Z",
      "waterEntryTime": "9:30:00",
      "waterExitTime": "12:00:00",
      "location": "SF - Ocean Beach Middle",
      "otherFriends": 0,
      "waveQuality": 2,
      "hollowness": 1,
      "funFactor": 3,
      "crowdedness": 2,
      "board": "Shortboard",
      "locationRollup": "SF",
      "comment": "An awesome session! Loved it. @cbogs"
    }, {
      "user_id": uId,
      "surferName": "Ramin Taleghani",
      "sessionDate": "2012-06-30T07:00:00.000Z",
      "waterEntryTime": "8:00:00",
      "waterExitTime": "10:00:00",
      "location": "SF - Ocean Beach Middle",
      "otherFriends": 2,
      "waveQuality": 2,
      "hollowness": 1,
      "funFactor": 3,
      "crowdedness": 1,
      "board": "Fish",
      "locationRollup": "SF",
      "comment": "An awesome session! Loved it. @cbogs"
    }, {
    "user_id": uId,
    "surferName": "Ramin Taleghani",
    "sessionDate": "2012-07-04T07:00:00.000Z",
    "waterEntryTime": "10:30:00",
    "waterExitTime": "12:30:00",
    "location": "SC South - Manresa / Sunset",
    "otherFriends": 3,
    "waveQuality": 1,
    "hollowness": 1,
    "funFactor": 2,
    "crowdedness": 1,
    "comment": "Surfed the morning after camping with the Bogarts and Josh.  Tgrom joined.",
    "board": "Fish",
    "locationRollup": "Santa Cruz",
    "comment": "An awesome session! Loved it. @cbogs"
    }, {
      "user_id": uId,
      "surferName": "Ramin Taleghani",
      "sessionDate": "2012-07-11T07:00:00.000Z",
      "waterEntryTime": "19:30:00",
      "waterExitTime": "20:30:00",
      "location": "SF - Ocean Beach Middle",
      "otherFriends": 1,
      "waveQuality": 1,
      "hollowness": 1,
      "funFactor": 2,
      "crowdedness": 1,
      "comment": "After work session with Kirk.  Fun to get out there.",
      "board": "Fish",
      "locationRollup": "SF",
      "comment": "An awesome session! Loved it. @cbogs"
    }, {
      "user_id": uId,
      "surferName": "Ramin Taleghani",
      "sessionDate": "2012-07-21T07:00:00.000Z",
      "waterEntryTime": "16:00:00",
      "waterExitTime": "19:00:00",
      "location": "SF - Ocean Beach South",
      "otherFriends": 1,
      "waveQuality": 3,
      "hollowness": 2,
      "funFactor": 4,
      "crowdedness": 1,
      "comment": "Awesome Saturday afternoon session with Matt.  Punchy fun.",
      "board": "Fish",
      "locationRollup": "SF",
      "comment": "An awesome session! Loved it. @cbogs"
    }, {
      "user_id": uId,
      "surferName": "Ramin Taleghani",
      "sessionDate": "2012-07-28T07:00:00.000Z",
      "waterEntryTime": "14:30:00",
      "waterExitTime": "15:30:00",
      "location": "SF - Ocean Beach South",
      "otherFriends": 1,
      "waveQuality": 2,
      "hollowness": 2,
      "funFactor": 3,
      "crowdedness": 1,
      "comment": "Fun, short session South of Sloat (when Kanika was waiting in the car).  It was wedgy and jacking up quickly.  Fun.  Got annihilated on a couple.  Joel got a bunch of good ones.",
      "board": "Fish",
      "locationRollup": "SF",
      "comment": "An awesome session! Loved it. @cbogs"
    },  {
      "user_id": uId,
      "surferName": "Ramin Taleghani",
      "sessionDate": "2012-08-03T07:00:00.000Z",
      "waterEntryTime": "19:00:00",
      "waterExitTime": "20:30:00",
      "location": "SF - Ocean Beach Middle",
      "otherFriends": 0,
      "waveQuality": 1,
      "hollowness": 1,
      "funFactor": 1,
      "crowdedness": 1,
      "comment": "Terrible session Friday after work.  Hardly caught anything.  May have been interesting on a log. Got a little workout at least. Looking forward to fall.",
      "board": "Shortboard",
      "locationRollup": "SF",
      "comment": "An awesome session! Loved it. @cbogs"
    }, {
      "user_id": uId,
      "surferName": "Ramin Taleghani",
      "sessionDate": "2012-08-11T07:00:00.000Z",
      "waterEntryTime": "13:30:00",
      "waterExitTime": "15:30:00",
      "location": "SF - Ocean Beach North",
      "otherFriends": 1,
      "waveQuality": 2,
      "hollowness": 2,
      "funFactor": 2,
      "crowdedness": 1,
      "comment": "Wild goose chase day with Joel - down to Davenport, checking everything in between then back up to OB.  Some good tacos in between.  Surprisingly clean conditions at OB for the first hour, but then the wind did get on it.  Decent, not great.",
      "board": "Fish",
      "locationRollup": "SF",
      "comment": "An awesome session! Loved it. @cbogs"
    });
  });
};

// Clear old users, then add a default user
User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, function(err, result) {
      setupSurf(result._id);
      // console.log('finished populating users');
    }
  );
});