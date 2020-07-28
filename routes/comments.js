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

router.get('/:id', (req, res) => {
  const {id} = req.params;
  Comments.getCommentByIssueId(id)
    .then(comments => {
      if (comments) {
        res.status(200).json(comments)
      } else {
        res.status(404).json({message: 'Could not find issue'})
      }
    }).catch(error =>
    res.status(500).json(error))
});
module.exports = router;