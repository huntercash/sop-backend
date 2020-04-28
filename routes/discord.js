const express = require('express');
const router = express.Router();

// Controllers
const { login, callback, getUserInfo } = require('../controllers/discord');

// Endpoints
router.get('/login', login);
router.get('/callback', callback);
router.get('/getuserinfo', getUserInfo);

module.exports = router;
