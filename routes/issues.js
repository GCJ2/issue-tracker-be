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

router.post('/', (req, res) => {
  Issues.addIssue(req.body)
    .then(issue => {
      res.status(200).json(issue)
    }).catch(error =>
    res.status(500).json({message: error}))
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  Issues.deleteIssue(id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({message: 'Deleted'})
      } else {
        res.status(404).json({message: `Issue of ID ${id} could not be found.`})
      }
    }).catch(error =>
    res.status(500).json({message: error}))
});

router.patch('/:id', (req, res) => {
  const {id} = req.params;
  const changes = req.body;
  Issues.updateIssue(id, changes)
    .then(issue => {
      if (issue) {
        res.status(200).json(issue)
      } else {
        res.status(404).json({message: 'Issue not found'})
      }
    }).catch(error =>
    res.status(500).json({message: error}))
});

module.exports = router;