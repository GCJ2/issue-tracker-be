const express = require('express');
const Issues = require('../models/Issues');
const router = express.Router();

router.get('/', (req, res) => {
  Issues.getAllIssues()
    .then(issues =>
      res.status(200).json(issues)
    ).catch(error => {
    res.status(500).json(error)
  })
});

module.exports = router;