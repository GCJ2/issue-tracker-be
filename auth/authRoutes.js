const express = require('express');
const Users = require('../models/Users');
const router = express.Router();
const bcrypt = require('bcrypt');
const generateToken = require('./generateToken');

router.post('/register', (req, res) => {
  const credentials = req.body;
  const {user_name, password} = credentials;
  //const userName = user_name;
  if (!(user_name && password)) {
    return res.status(400).json({message: 'Username and password are required'})
  }
  credentials.password = bcrypt.hashSync(credentials.password, 12);
  Users.add(credentials)
    .then(user => {
      const token = generateToken(user);
      res.status(201).json({user, token})
    }).catch(error => {
    res.status(500).json({message: 'Please supply a user_name, password, first_name, and last_name and ensure that the username is available', error})
  })
});

router.post('/login', (req, res) => {
  const {user_name, password} = req.body;
  if (!(user_name && password)) {
    return res.status(400).json({message: 'Username and Password are required'})
  }
  Users.findUserForLogIn(user_name)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(201).json({message: `Welcome back ${user_name}`, token})
      } else {
        res.status(401).json({message: 'Invalid credentials'});
      }
    })
    .catch(error =>
      res.status(500).json(error));
});

module.exports = router;