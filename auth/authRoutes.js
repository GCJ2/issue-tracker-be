const express = require('express');
const Users = require('../models/Users');
const router = express.Router();
const bcrypt = require('bcrypt');
const generateToken = require('./generateToken');

router.post('/register', (req, res) => {
  const credentials = req.body;
  const {user_name, password} = credentials;
  if (!(user_name && password)) {
    return res.status(400).json({message:'Username and password are required'})
  }
  credentials.password = bcrypt.hashSync(credentials.password, 12);

  Users.add(credentials)
    .then(user => {
      res.status(200).json(user)
    }).catch(error => {
      if (error.errno === 19) {
        res.status(400).json({message: 'Username already exists'})
      } else {
        res.status(500).json(error)
      }
  })
});

module.exports = router;