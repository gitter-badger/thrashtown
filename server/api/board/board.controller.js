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

    res.json(200, user.boards);
  });
};

exports.create = function (req, res, next) {
  var board = req.body;
  var userId = req.user._id;

  User.findById(userId, function (err, user) {
    if (err) {
      return next(err);
    }
    
    if (!user) {
      return res.send(404);
    }
    if (user.boards.length === 0) {
      // if this is the first board
      board.default = true;
    } else if (board.default === true) {
      // make sure only one board is the default
      for (var i = 0; i < user.boards.length; i++) {
        if (user.boards[i].default) {
          user.boards[i].default = false;
        }
      }
    }
    console.log(board);
    user.boards.push(board);
    user.save(function (err) {
      if (err) {
        return res.send(400);
      }
      //TODO: ideally this would be the newly created board as saved in the db

      res.json(201, board);
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
  var boardId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) {
      return next(err);
    }
    
    if (!user) {
      return res.send(404);
    }

    var board = user.boards.id(boardId);
    if (!board) {
      return res.send(400);
    }
    
    if (user.boards.length === 1) {
      // if this is the first board
      data.default = true;
    } else if (data.default === true) {
      // make sure only one board is the default
      for (var i = 0; i < user.boards.length; i++) {
        if (user.boards[i].default) {
          user.boards[i].default = false;
        }
      }
    }

    var updated = _.assign(board, data);
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
  var boardId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) {
      return next(err);
    }
    
    if (!user) {
      return res.send(404);
    }
    var deleted = user.boards.id(boardId).remove();
    user.save(function (err) {
      if (err) {
        return res.send(400);
      }

      res.json(200, deleted);
    });
  });
};
