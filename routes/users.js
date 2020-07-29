const express = require('express');
const Users = require('../models/Users');
const Issues = require('../models/Issues')
const router = express.Router();

router.get('/', (req, res) => {
  Users.getAllUsers()
    .then(users =>
      res.status(200).json(users)
    ).catch(error => {
    res.status(500).json(error)
  })
});

router.get('/id/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const user = await Users.findByID(id);
    if (user) {
      user.issues = await Issues.getIssuesByUserID(id);
      delete user.password;
      res.status(200).json(user)
    } else {
      res.status(404).json({message: 'Could not find user'})
    }
  } catch (error) {
    res.status(500).json(error)
  }
});


router.get('/username/:username', async (req, res) => {
  try {
    const {username} = req.params;
    const user = await Users.findByUserName(username);
    if (user) {
      user.issues = await Issues.getIssuesByUserID(user.id);
      delete user.password;
      res.status(200).json(user)
    } else {
      res.status(404).json({message: 'Could not find user'})
    }
  } catch (error) {
    res.status(500).json(error)
  }
});

// router.post('/', (req, res) => {
//   Users.add(req.body)
//     .then(user => {
//       res.status(201).json(user)
//     }).catch(error =>
//     res.status(500).json(error))
// });

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  Users.deleteUser(id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({message: 'User deleted'})
      } else {
        res.status(404).json({message: `User with ID of ${id} not found`})
      }
    }).catch(error =>
    res.status(500).json(error))
});

router.patch('/:id', (req, res) => {
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