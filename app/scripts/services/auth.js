'use strict';

angular.module('hackathonApp')
  .factory('Auth', function Auth($http, $location, $rootScope, Session, User, $cookieStore) {
    
    // Get currentUser from cookie
    $rootScope.currentUser = $cookieStore.get('user') || null;
    $cookieStore.remove('user');

    return {

      /**
       * Authenticate user
       * 
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}            
       */
      login: function (user, callback) {
        var cb = callback || angular.noop;

        return Session.save({
          email: user.email,
          password: user.password
        }, function (user) {
          $rootScope.currentUser = user;
          return cb();
        }, function (err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Unauthenticate user
       * 
       * @param  {Function} callback - optional
       * @return {Promise}           
       */
      logout: function (callback) {
        var cb = callback || angular.noop;

        return Session.delete(function () {
            $rootScope.currentUser = null;
            return cb();
          },
          function (err) {
            return cb(err);
          }).$promise;
      },

      /**
       * Create a new user
       * 
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}            
       */
      createUser: function (user, callback) {
        var cb = callback || angular.noop;

        return User.save(user,
          function (user) {
            $rootScope.currentUser = user;
            return cb(user);
          },
          function (err) {
            return cb(err);
          }).$promise;
      },

      /**
       * Change password
       * 
       * @param  {String}   oldPassword 
       * @param  {String}   newPassword 
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      changePassword: function (oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.update({
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function (user) {
          return cb(user);
        }, function (err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Request password reset
       * 
       * @param  {String}   email 
       * @return {Promise}
       */
      requestPasswordReset: function (email) {
        return $http.post('api/forgot-password', {
          email: email
        });
      },

      /**
       * Validate password reset token
       * 
       * @param  {String}   token 
       * @return {Promise}       
       */
      validateResetToken: function (token) {
        return $http.get('api/forgot-password/' + token);
      },

      /**
       * Reset password with token
       * 
       * @param  {String}   token 
       * @return {Promise}
       */
      resetPasswordWithToken: function (token, password1, password2) {
        return $http.post('api/forgot-password/' + token, {
          password1: password1,
          password2: password2
        });
      },

      /**
       * Gets all available info on authenticated user
       * 
       * @return {Object} user
       */
      currentUser: function () {
        return User.get();
      },

      /**
       * Simple check to see if a user is logged in
       * 
       * @return {Boolean}
       */
      isLoggedIn: function () {
        var user = $rootScope.currentUser;
        return !!user;
      },
    };
  });