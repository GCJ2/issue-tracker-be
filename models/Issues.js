const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);

module.exports = {
  addIssue,
  getAllIssues,
  findByID,
  getIssuesByUserID,
  deleteIssue,
  updateIssue
};

async function addIssue(issue) {
  return db('issues')
    .insert(issue, issue)
}

function getAllIssues() {
  return db('issues')
    .select(
      'issues.id',
      'issues.title',
      'issues.description',
      'issues.importance',
      'created.user_name AS created_by',
      'issues.status',
      'assign.user_name AS assigned_to',
      'updated.user_name AS last_updated_by',
      'issues.created_at',
      'issues.updated_at',
    )
    .join('users AS assign', 'issues.assigned_to', 'assign.id')
    .join('users AS created', 'issues.created_by', 'created.id')
    .join('users AS updated', 'issues.last_updated_by', 'updated.id')
}

function findByID(id) {
  return db('issues')
    .where({'issues.id' : id})
    .select(
      'issues.id',
      'issues.title',
      'issues.description',
      'issues.importance',
      'created.user_name AS created_by',
      'issues.status',
      'assign.user_name AS assigned_to',
      'updated.user_name AS last_updated_by',
      'issues.created_at',
      'issues.updated_at',
    )
    .join('users AS assign', 'issues.assigned_to', 'assign.id')
    .join('users AS created', 'issues.created_by', 'created.id')
    .join('users AS updated', 'issues.last_updated_by', 'updated.id')
    .first();
}

function getIssuesByUserID(id) {
  return db('issues')
    .where({'issues.assigned_to' : id})
    .select(
      'assign.user_name AS assigned_to',
      'issues.id',
      'issues.title',
      'issues.description',
      'issues.importance',
      'created.user_name AS created_by',
      'issues.status',
      'updated.user_name AS last_updated_by',
      'issues.created_at',
      'issues.updated_at',
    )
    .join('users AS assign', 'issues.assigned_to', 'assign.id')
    .join('users AS created', 'issues.created_by', 'created.id')
    .join('users AS updated', 'issues.last_updated_by', 'updated.id')
}

function deleteIssue(id) {
  return db('issues')
    .where({id})
    .del()
}

function updateIssue(id, changes) {
  return db('issues')
    .where({id})
    .update(changes)
    .then(() => {
      return findByID(id)
    })
}
