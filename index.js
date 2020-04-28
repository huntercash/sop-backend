const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT;
const bodyParser = require('body-parser');

// Files
const sopRoutes = require('./routes/sopRoutes');

// Middleware
const server = express();
server.use(bodyParser.json());
server.use(morgan('dev'));
// if (process.env.NODE_ENV === 'development') {
server.use(
  cors({
    origin: [`${process.env.CLIENT_URL}`, 'https://www.discordapp.com']
  })
);
// }
server.get('*', (req, res, next) => {
  console.log(req.get('Origin'));
  console.log(req.hostname);
  console.log(req.get('Referrer'));
  if (
    req.get('Origin') == process.env.CLIENT_URL ||
    req.hostname === 'localhost' ||
    req.hostname === 'ironfealty' ||
    req.get('Origin') === 'https://discordapp.com' ||
    req.get('Origin') === 'https://www.ironfealty.com' ||
    req.hostname === '127.0.0.1' ||
    req.get('Referrer') === 'https://discordapp.com/' ||
    req.get('Referrer') === 'http://localhost:3000/'
  ) {
    // console.log(req.get('Origin'));
    // console.log(req.hostname);
    next();
  } else {
    // console.log(req.get('Origin'));
    res.status(401).json({ error: 'unauthorized' });
  }
});

// Routes
server.use('/api', sopRoutes);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
