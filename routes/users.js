const express = require('express');
const Users = require('../models/Users');
const router = express.Router();

router.get('/', (req, res) => {
  Users.getAllUsers()
    .then(users =>
      res.status(200).json(users)
    ).catch(error => {
    res.status(500).json(error)
  })
});

router.get('/id/:id', (req, res) => {
  const {id} = req.params;
  Users.findByID(id)
    .then(user => {
        if (user) {
          res.status(200).json(user)
        }
        else {
          res.status(404).json({message: 'User not found'})
        }
      }
    ).catch(error => {
    res.status(500).json(error)
  })
});

router.get('/user/:username', (req, res) => {
  const {username} = req.params;
  console.log(username)
  Users.findByUserName(username.toUpperCase())
    .then(user => {
        if (user) {
          res.status(200).json(user)
        } else {
          res.status(404).json({message: 'User not found'})
        }
      }
    ).catch(error => {
    res.status(500).json(error)
  })
});

router.post('/', (req, res) => {
  console.log(req.body);
  Users.add(req.body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error =>
      res.status(500).json({message: error}))
});

module.exports = router;