const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express();
const logger = require('../logger');
const restricted = require('../auth/restrictedMiddleware');
const userRouter = require('../routes/users');
const issueRouter = require('../routes/issues');
const commentsRouter = require('../routes/comments');

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/api', logger, (req, res) => {
  res.json({message: 'Working'})
});

server.use('/api/users', logger, restricted, userRouter);
server.use('/api/issues', logger, issueRouter);
server.use('/api/comments', logger, commentsRouter);


server.use((req, res) => {
  res.status(404).json({message: 'Invalid Endpoint'})
});

module.exports = server;