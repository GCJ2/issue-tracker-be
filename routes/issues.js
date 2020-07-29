const express = require('express');
const Issues = require('../models/Issues');
const Comments = require('../models/Comments');
const router = express.Router();

router.get('/', (req, res) => {
  Issues.getAllIssues()
    .then(issues =>
      res.status(200).json(issues)
    ).catch(error => {
    res.status(500).json(error)
  })
});

router.get('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const issue = await Issues.findByID(id);
    if (issue) {
      issue.comments = await Comments.getCommentByIssueId(id);
      res.status(200).json(issue);
    } else {
      res.status(404).json({message: 'Could not find issue'})
    }
  } catch (error) {
    res.status(500).json(error)
  }
});

router.get('/user/:id', (req, res) => {
  const {id} = req.params;
  Issues.getIssuesByUserID(id)
    .then(issues => {
      if (issues) {
        res.status(200).json(issues)
      } else {
        res.status(404).json({message: 'This user has no assigned issues'})
      }
    }).catch(error =>
    res.status(500).json(error))
});

router.post('/', (req, res) => {
  Issues.addIssue(req.body)
    .then(issue => {
      res.status(201).json(issue)
    }).catch(error =>
    res.status(500).json(error))
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  Issues.deleteIssue(id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({message: 'Issue deleted'})
      } else {
        res.status(404).json({message: `Issue of ID ${id} could not be found.`})
      }
    }).catch(error =>
    res.status(500).json(error))
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
    res.status(500).json(error))
});

module.exports = router;