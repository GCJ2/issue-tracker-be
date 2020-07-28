const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);

module.exports = {
  getAllComments,
  getCommentByIssueId
};

function getAllComments() {
  return db('comments')
    .join('users', {'comments.createdBy': 'users.id'})
    .join('issues', {'comments.issue': 'issues.id'})
    .select(
      'issues.title AS Issue',
      'comments.comment',
      'users.user_name AS createdBy',
      'comments.created_at')
}

function getCommentByIssueId(id) {
  return db('comments')
    .join('users', {'comments.createdBy': 'users.id'})
    .join('issues', {'comments.issue': 'issues.id'})
    .select(
      'issues.title AS Issue',
      'comments.comment',
      'users.user_name AS createdBy',
      'comments.created_at')
    .where({'issues.id' : id})
}