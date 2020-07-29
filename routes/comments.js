const express = require('express');
const Comments = require('../models/Comments');
const router = express.Router();

router.get('/', (req, res) => {
  Comments.getAllComments()
    .then(comments =>
      res.status(200).json(comments)
    ).catch(error =>
    res.status(500).json(error)
  )
});

router.get('/issue/:id', (req, res) => {
  const {id} = req.params;
  Comments.getCommentByIssueId(id)
    .then(comments => {
      if (comments.length !== 0) {
        res.status(200).json(comments)
      } else {
        res.status(404).json({message: 'Could not find issue'})
      }
    }).catch(error =>
    res.status(500).json(error))
});

router.get('/:id', (req, res) => {
  const {id} = req.params;
  Comments.getCommentById(id)
    .then(comment => {
      if (comment.length !== 0) {
        res.status(200).json(comment);
      } else {
        res.status(404).json({message: 'Could not find comment'})
      }
    }).catch(error =>
    res.status(500).json(error))
});

router.post('/', (req, res) => {
  Comments.addComment(req.body)
    .then(comment => {
      res.status(201).json(comment)
    }).catch(error =>
    res.status(500).json(error))
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  Comments.deleteComment(id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({message: 'Comment deleted'})
      } else {
        res.status(404).json({message: `Comment of ID ${id} could not be found`})
      }
    }).catch(error =>
    res.status(500).json(error))
});

router.patch('/:id', (req, res) => {
  const {id} = req.params;
  const changes = req.body;
  Comments.updateComment(id, changes)
    .then(comment => {
      if (comment) {
        res.status(200).json(comment)
      } else {
        res.status(404).json({message: 'Comment not found'})
      }
    }).catch(error =>
    res.status(500).json(error))
});


module.exports = router;