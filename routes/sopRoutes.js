const express = require('express');
const router = express.Router();

//
// Routers
const discord = require('./discord');
const user = require('./user');
// Controllers
const {
  SeatsOfPower,
  Titles,
  AttackerTitles,
  allBonuses
} = require('../controllers/sopRoutes');

// Other Routers
router.use('/discord', discord);
router.use('/user', user);
// Endpoints
router.get('/allsops', SeatsOfPower);
router.get('/titles', Titles);
router.get('/attackertitles', AttackerTitles);
router.get('/allbonus', allBonuses);

// Error Handling
router.use((err, req, res, next) => {
  switch (err.message) {
    case 'NoCodeProvided':
      return res.status(400).send({
        status: 'ERROR',
        error: err.message
      });
    default:
      return res.status(500).send({
        status: 'ERROR',
        error: err.message
      });
  }
});

module.exports = router;
