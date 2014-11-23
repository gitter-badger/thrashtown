/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Surf = require('../api/surf/surf.model');
var spots = require('./surf-spots-data');

// Used to be able to do this, but can't anymore due I think to the way the
// models are being bootstrapped compared to the old version.
// var mongoose = require('mongoose');
// var User = mongoose.model('User');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

// Populate database with sample application data
var setupSurf = function (uId, boardId, surfSpotId) {
  Surf.find({}).remove(function () {
    Surf.create(
      {"user_id": uId, "sessionDate": "2012-01-23T07:00:00.000Z", "sessionHours": 1.75, "surfSpot_id": surfSpotId, "otherFriends": 0, "waveQuality": 2, "hollowness": 1, "funFactor": 3, "crowdedness": 2, "board_id": boardId, "comment": "An awesome session! Loved it. @cbogs"}, 
      {"user_id": uId, "sessionDate": "2012-01-30T07:00:00.000Z", "sessionHours": 1.75, "surfSpot_id": surfSpotId, "otherFriends": 2, "waveQuality": 2, "hollowness": 1, "funFactor": 3, "crowdedness": 1, "board_id": boardId, "comment": "An awesome session! Loved it. @cbogs"}, 
      {"user_id": uId, "sessionDate": "2012-03-04T07:00:00.000Z", "sessionHours": 1.75, "surfSpot_id": surfSpotId, "otherFriends": 3, "waveQuality": 1, "hollowness": 1, "funFactor": 2, "crowdedness": 1, "board_id": boardId, "comment": "Surfed the morning after camping with the Bogarts and Josh.  Tgrom joined. <script>alert('fix this ram')</script>"}, 
      {"user_id": uId, "sessionDate": "2012-03-11T07:00:00.000Z", "sessionHours": 1.75, "surfSpot_id": surfSpotId, "otherFriends": 1, "waveQuality": 1, "hollowness": 1, "funFactor": 2, "crowdedness": 1, "board_id": boardId, "comment": "After work session with Kirk.  Fun to get out there."}, 
      {"user_id": uId, "sessionDate": "2012-04-21T07:00:00.000Z", "sessionHours": 1.75, "surfSpot_id": surfSpotId, "otherFriends": 1, "waveQuality": 3, "hollowness": 2, "funFactor": 4, "crowdedness": 1, "board_id": boardId, "comment": "Awesome Saturday afternoon session with Matt.  Punchy fun."}, 
      {"user_id": uId, "sessionDate": "2012-06-28T07:00:00.000Z", "sessionHours": 1.75, "surfSpot_id": surfSpotId, "otherFriends": 1, "waveQuality": 2, "hollowness": 2, "funFactor": 3, "crowdedness": 1, "board_id": boardId, "comment": "Fun, short session South of Sloat (when Kanika was waiting in the car).  It was wedgy and jacking up quickly.  Fun.  Got annihilated on a couple.  Joel got a bunch of good ones."}, 
      {"user_id": uId, "sessionDate": "2012-08-03T07:00:00.000Z", "sessionHours": 1.75, "surfSpot_id": surfSpotId, "otherFriends": 0, "waveQuality": 1, "hollowness": 1, "funFactor": 1, "crowdedness": 1, "board_id": boardId, "comment": "Terrible session Friday after work.  Hardly caught anything.  May have been interesting on a log. Got a little workout at least. Looking forward to fall."}, 
      {"user_id": uId, "sessionDate": "2012-08-11T07:00:00.000Z", "sessionHours": 1.75, "surfSpot_id": surfSpotId, "otherFriends": 1, "waveQuality": 2, "hollowness": 2, "funFactor": 2, "crowdedness": 1, "board_id": boardId, "comment": "Wild goose chase day with Joel - down to Davenport, checking everything in between then back up to OB.  Some good tacos in between.  Surprisingly clean conditions at OB for the first hour, but then the wind did get on it.  Decent, not great."},
      {"user_id": uId, "sessionDate": "2012-01-22T07:00:00.000Z", "sessionHours": 1.75, "surfSpot_id": surfSpotId, "otherFriends": 0, "waveQuality": 2, "hollowness": 1, "funFactor": 3, "crowdedness": 2, "board_id": boardId, "comment": "Crazy times in the city surf."}, 
      {"user_id": uId, "sessionDate": "2012-01-29T07:00:00.000Z", "sessionHours": 1.75, "surfSpot_id": surfSpotId, "otherFriends": 2, "waveQuality": 2, "hollowness": 1, "funFactor": 3, "crowdedness": 1, "board_id": boardId, "comment": "Dude gets crazy son"},
      {"user_id": uId, "sessionDate": "2012-03-03T07:00:00.000Z", "sessionHours": 1.75, "surfSpot_id": surfSpotId, "otherFriends": 3, "waveQuality": 1, "hollowness": 1, "funFactor": 2, "crowdedness": 1, "board_id": boardId, "comment": "Wait for tonight"}, 
      {"user_id": uId, "sessionDate": "2012-03-10T07:00:00.000Z", "sessionHours": 1.75, "surfSpot_id": surfSpotId, "otherFriends": 1, "waveQuality": 1, "hollowness": 1, "funFactor": 2, "crowdedness": 1, "board_id": boardId, "comment": "Oh oh o"}, 
      {"user_id": uId, "sessionDate": "2012-04-20T07:00:00.000Z", "sessionHours": 1.75, "surfSpot_id": surfSpotId, "otherFriends": 1, "waveQuality": 3, "hollowness": 2, "funFactor": 4, "crowdedness": 1, "board_id": boardId, "comment": "when you "}, 
      {"user_id": uId, "sessionDate": "2012-06-27T07:00:00.000Z", "sessionHours": 1.75, "surfSpot_id": surfSpotId, "otherFriends": 1, "waveQuality": 2, "hollowness": 2, "funFactor": 3, "crowdedness": 1, "board_id": boardId, "comment": "would be here"}, 
      {"user_id": uId, "sessionDate": "2012-08-02T07:00:00.000Z", "sessionHours": 1.75, "surfSpot_id": surfSpotId, "otherFriends": 0, "waveQuality": 1, "hollowness": 1, "funFactor": 1, "crowdedness": 1, "board_id": boardId, "comment": "in"}, 
      {"user_id": uId, "sessionDate": "2012-08-10T07:00:00.000Z", "sessionHours": 1.75, "surfSpot_id": surfSpotId, "otherFriends": 1, "waveQuality": 2, "hollowness": 2, "funFactor": 2, "crowdedness": 1, "board_id": boardId, "comment": "my"},
      {"user_id": uId, "sessionDate": "2012-01-21T07:00:00.000Z", "sessionHours": 1.75, "surfSpot_id": surfSpotId, "otherFriends": 0, "waveQuality": 2, "hollowness": 1, "funFactor": 3, "crowdedness": 2, "board_id": boardId, "comment": "arms, waiting for tonight, oh o o o o"}, 
      {"user_id": uId, "sessionDate": "2012-01-28T07:00:00.000Z", "sessionHours": 1.75, "surfSpot_id": surfSpotId, "otherFriends": 2, "waveQuality": 2, "hollowness": 1, "funFactor": 3, "crowdedness": 1, "board_id": boardId, "comment": "i've dreamed of this love"}, 
      {"user_id": uId, "sessionDate": "2012-03-02T07:00:00.000Z", "sessionHours": 1.75, "surfSpot_id": surfSpotId, "otherFriends": 3, "waveQuality": 1, "hollowness": 1, "funFactor": 2, "crowdedness": 1, "board_id": boardId, "comment": "for so long"}, 
      {"user_id": uId, "sessionDate": "2012-03-09T07:00:00.000Z", "sessionHours": 1.75, "surfSpot_id": surfSpotId, "otherFriends": 1, "waveQuality": 1, "hollowness": 1, "funFactor": 2, "crowdedness": 1, "board_id": boardId, "comment": "super duper super surf"}, 
      {"user_id": uId, "sessionDate": "2012-04-19T07:00:00.000Z", "sessionHours": 1.75, "surfSpot_id": surfSpotId, "otherFriends": 1, "waveQuality": 3, "hollowness": 2, "funFactor": 4, "crowdedness": 1, "board_id": boardId, "comment": "i am the new kelly slater"}, 
      {"user_id": uId, "sessionDate": "2012-06-26T07:00:00.000Z", "sessionHours": 1.75, "surfSpot_id": surfSpotId, "otherFriends": 1, "waveQuality": 2, "hollowness": 2, "funFactor": 3, "crowdedness": 1, "board_id": boardId, "comment": "blowing it"}, 
      {"user_id": uId, "sessionDate": "2012-08-01T07:00:00.000Z", "sessionHours": 1.75, "surfSpot_id": surfSpotId, "otherFriends": 0, "waveQuality": 1, "hollowness": 1, "funFactor": 1, "crowdedness": 1, "board_id": boardId, "comment": "big time"}, 
      {"user_id": uId, "sessionDate": "2012-08-09T07:00:00.000Z", "sessionHours": 1.75, "surfSpot_id": surfSpotId, "otherFriends": 1, "waveQuality": 2, "hollowness": 2, "funFactor": 2, "crowdedness": 1, "board_id": boardId, "comment": "busted"}
    );
  });
};

var quiver = [
  {
    name: 'Ward Coffey',
    default: true,
    size: '6\'2"',
    category: 'Shortboard'
  }, {
    name: 'M10 Hogfish',
    default: false,
    size: '5\'11"',
    category: 'Fish'
  }, {
    name: 'Arrow',
    default: false,
    size: '8\'0"',
    category: 'Funboard/Other'
  }, {
    name: 'Strive',
    default: false,
    size: '7\'5"',
    category: 'Step-Up'
  }];

// Clear old users, then add a default users
User.find({}).remove(function () {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test',
    boards: quiver,
    surfSpots: spots.surfSpots,
  }, function (err, result) {
      console.log('>> Test user created with quiver and spots.')
      setupSurf(result._id, result.boards[0]._id, result.surfSpots[0]._id);
    }
  );
  
  User.create({
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('>> Admin user created with no quiver nor spots.');
    }
  );
});
