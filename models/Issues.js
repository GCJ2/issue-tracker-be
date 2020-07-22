const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);

module.exports = {
  getAllIssues
};

function getAllIssues() {
  return db('issues')
    .join('users', {'issues.assigned_to' : 'users.id'})
    .select(
      'issues.id',
      'issues.title',
      'issues.description',
      'issues.importance',
      'issues.created_by',
      'issues.status',
      'issues.assigned_to',
      'issues.last_updated_by',
      'users.user_name',
      'issues.created_at',
      'issues.updated_at',
    )
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