const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);

module.exports = {
  add,
  getAllUsers,
  findByUserName,
  findByID,
  deleteUser,
  updateUser
};

async function add(user) {
  return await db('users')
    .insert(user, ['user_name', 'role'])
}

function getAllUsers() {
  return db('users')
    .join('roles', {'users.role': 'roles.id'})
    .select('user_name',
      'first_name',
      'last_name',
      'roles.title')
}

function findByUserName(user_name) {
  return db('users')
    .whereRaw('LOWER(user_name) LIKE ?',
      '%' + user_name.toLowerCase() + '%')
    .join('roles', {'users.role': 'roles.id'})
    .select('user_name',
      'first_name',
      'last_name',
      'roles.title')
    .first();
}

function findByID(id) {
  return db('users')
    .where({id})
    .join('roles', {'users.role': 'roles.id'})
    .select('user_name',
      'first_name',
      'last_name',)
    // 'roles.title')
    .first();
}

function deleteUser(id) {
  return db('users')
    .where({id})
    .del()
}

function updateUser(id, changes) {
  return db('users')
    .where({id})
    .update(changes)
    .then(() => {
      return findByID(id)
    })
}