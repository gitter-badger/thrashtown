'use strict';

var mongoose = require('mongoose');
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

    res.send({ boards: user.boards });
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
    if (user.boards.length === 0) {
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
    user.boards.push(data);
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

    board.name = data.name;
    board.size = data.size;
    board.category = data.category;
    board.default = data.default; 

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
  var boardId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) {
      return next(err);
    }
    
    if (!user) {
      return res.send(404);
    }
    user.boards.id(boardId).remove();
    user.save(function (err) {
      if (err) {
        return res.send(400);
      }

      res.send(200);
    });
  });
};
