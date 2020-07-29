const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);

module.exports = {
  getAllComments,
  getCommentByIssueId,
  getCommentById,
  addComment,
  deleteComment,
  updateComment
};

function getAllComments() {
  return db('comments')
    .join('users', {'comments.createdBy': 'users.id'})
    .join('issues', {'comments.issue': 'issues.id'})
    .select(
      'comments.id as commentId',
      'comments.comment',
      'users.user_name AS createdBy',
      'comments.created_at AS createdAt',
      'comments.updated_at AS updatedAt',
      'issues.id AS issueId',
      'issues.title AS issue')
}

function getCommentByIssueId(id) {
  return db('comments')
    .join('users', {'comments.createdBy': 'users.id'})
    .join('issues', {'comments.issue': 'issues.id'})
    .select(
      'comments.id AS commentId',
      'comments.comment',
      'users.user_name AS createdBy',
      'comments.created_at AS createdAt')
    .where({'issues.id': id})
}

function getCommentById(id) {
  return db('comments')
    .join('users', {'comments.createdBy': 'users.id'})
    .join('issues', {'comments.issue': 'issues.id'})
    .select(
      'comments.id as commentId',
      'comments.comment',
      'users.user_name AS createdBy',
      'comments.created_at AS createdAt',
      'issues.id AS issueId',
      'issues.title AS issue')
    .where({'comments.id': id})
}

async function addComment(comment) {
  const [id] = await db('comments')
    .insert(comment);
  return getCommentById(id)
}

function deleteComment(id) {
  return db('comments')
    .where({id})
    .del()
}

function updateComment(id, changes) {
  return db('comments')
    .where({id})
    .update(changes)
    .then(() => {
      return getCommentById(id)
    })
}