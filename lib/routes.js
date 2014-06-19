'use strict';

var surfs = require('./controllers/api'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.route('/api/surfs')
    .get(middleware.auth, surfs.show)
    .post(middleware.auth, surfs.create);
  
  app.route('/api/users')
    .post(users.create)
    .put(middleware.auth, users.changePassword);

  app.route('/api/users/me')
    .get(middleware.auth, users.me);

  app.route('/api/users/me/boards')
    .get(middleware.auth, users.getBoards)
    .post(middleware.auth, users.createBoards);
    
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