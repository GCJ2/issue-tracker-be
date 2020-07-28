const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);

module.exports = {
  getAllComments,
  getCommentByIssueId,
  getCommentById,
  addComment
};

function getAllComments() {
  return db('comments')
    .join('users', {'comments.createdBy': 'users.id'})
    .join('issues', {'comments.issue': 'issues.id'})
    .select(
      'issues.title AS issue',
      'issues.id AS issueId',
      'comments.comment',
      'comments.id as commentId',
      'users.user_name AS createdBy',
      'comments.created_at AS createdAt')
}

function getCommentByIssueId(id) {
  return db('comments')
    .join('users', {'comments.createdBy': 'users.id'})
    .join('issues', {'comments.issue': 'issues.id'})
    .select(
      // 'issues.title AS issue',
      // 'issues.id AS issueId',
      'comments.comment',
      'comments.id as commentId',
      'users.user_name AS createdBy',
      'comments.created_at AS createdAt')
    .where({'issues.id': id})
}

function getCommentById(id) {
  return db('comments')
    .join('users', {'comments.createdBy': 'users.id'})
    .join('issues', {'comments.issue': 'issues.id'})
    .select(
      // 'issues.title AS Issue',
      'comments.comment',
      'users.user_name AS createdBy',
      'comments.created_at')
    .where({'comments.id': id})
}

async function addComment(comment) {
  const [id] = await db('comments')
    .insert(comment);
  return getCommentById(id)
}