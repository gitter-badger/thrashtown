'use strict';

var surfs = require('./controllers/api'),
    index = require('./controllers'),
    boards = require('./controllers/boards'),
    surfSpots = require('./controllers/surfSpots'), 
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function (app) {

  // Server API Routes
  app.route('/api/surfs')
    .get(middleware.auth, surfs.readAll)
    .post(middleware.auth, surfs.create);

  app.route('/api/surfs/:id')
    .get(middleware.auth, surfs.read)
    .put(middleware.auth, surfs.update)
    .delete(middleware.auth, surfs.delete);
  //   .get(middleware.auth, surfs.show)
  //   .post(middleware.auth, surfs.create);
  
  app.route('/api/users')
    .post(users.create)
    .put(middleware.auth, users.changePassword);

  app.route('/api/users/me')
    .get(middleware.auth, users.me);

  app.route('/api/forgot-password')
    .post(users.forgotPassword);

  app.route('/api/boards')
    .get(middleware.auth, boards.getBoards)
    .post(middleware.auth, boards.createBoard);

  app.route('/api/boards/:id')
    .put(middleware.auth, boards.updateBoard)
    .delete(middleware.auth, boards.deleteBoard);

  app.route('/api/surfspots')
    .get(middleware.auth, surfSpots.getSurfSpots)
    .post(middleware.auth, surfSpots.createSurfSpot);

  app.route('/api/surfspots/:id')
    .put(middleware.auth, surfSpots.updateSurfSpot)
    .delete(middleware.auth, surfSpots.deleteSurfSpot);
    
  // get profile of specified user
  // app.route('/api/users/:id')
  //   .get(users.show);

  app.route('/api/session')
    .post(session.login)
    .delete(session.logout);

  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);
  app.route('/*')
    .get( middleware.setUserCookie, index.index);
};