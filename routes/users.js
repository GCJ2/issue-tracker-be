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

module.exports = router;