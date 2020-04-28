const express = require('express');
const router = express.Router();

// Controllers
const { authorize } = require('../controllers/user');
const { recordPower, getPower } = require('../controllers/power');

// Endpoints
router.post('/authorize', authorize);
router.post('/recordPower', recordPower);
router.get('/power', getPower);

module.exports = router;
