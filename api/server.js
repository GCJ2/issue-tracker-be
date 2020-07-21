const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express();
const logger = require('../logger');

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/api', logger, (req, res) => {
  res.json({message: 'Working'})
});

module.exports = server;