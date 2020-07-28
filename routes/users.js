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
        } else {
          res.status(404).json({message: 'User not found'})
        }
      }
    ).catch(error => {
    res.status(500).json(error)
  })
});

router.get('/username/:username', (req, res) => {
  const {username} = req.params;
  Users.findByUserName(username)
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
  Users.add(req.body)
    .then(user => {
      res.status(201).json(user)
    }).catch(error =>
      res.status(500).json(error))
});

router.delete('/id/:id', (req, res) => {
  const {id} = req.params;
  Users.deleteUser(id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({message: 'Deleted'})
      } else {
        res.status(404).json({message: `User with ID of ${id} not found`})
      }
    }).catch(error =>
      res.status(500).json(error))
});

router.patch('/id/:id', (req, res) => {
  const {id} = req.params;
  const changes = req.body;
  Users.updateUser(id, changes)
    .then(user => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({message: "User not found"})
      }
    }).catch(error =>
      res.status(500).json(error))
});

module.exports = router;