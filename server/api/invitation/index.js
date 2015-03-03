'use strict';

var express = require('express');
var controller = require('./invitation.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.post('/', auth.isAuthenticated(), controller.create);
router.post('/:id/accept', auth.isAuthenticated(), controller.accept);
// router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;