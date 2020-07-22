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

router.get('/:id', (req, res) => {
  const {id} = req.params;
  Issues.findByID(id)
    .then(issue => {
      if (issue) {
        res.status(200).json(issue)
      } else {
        res.status(404).json({message: 'Could not find issue'})
      }
    }).catch(error =>
  res.status(500).json(error))
});

module.exports = router;