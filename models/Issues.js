const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);

module.exports = {
  getAllIssues
};

function getAllIssues() {
  return db
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
    .from('issues')
    .join('users AS assign', 'issues.assigned_to',  'assign.id')
    .join('users AS created', 'issues.created_by',  'created.id')
    .join('users AS updated', 'issues.last_updated_by',  'updated.id')

    // .select('*')
    // .from('issues')
    // .leftOuterJoin('users', function () {
    //   this
    //     .on('issues.assigned_to', 'users.id')
    //     .on('issues.created_by', 'users.id')
    // })
}

// function getAllIssues() {
//   return db('issues')
//     // .join('users', {'issues.assigned_to' : 'users.id'})
//     .select('*')
//     .from('issues')
//     .join('users', function () {
//       this.on({'issues.assigned_to' : 'users.id'})
//     })
// }