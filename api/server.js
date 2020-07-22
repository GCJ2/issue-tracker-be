const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express();
const logger = require('../logger');
const userRouter = require('../routes/users');

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/api', logger, (req, res) => {
  res.json({message: 'Working'})
});
server.use('/api/users', logger, userRouter);

server.use((req, res) => {
  res.status(404).json({message: 'Invalid Endpoint'})
});

module.exports = server;