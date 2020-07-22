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
    .insert(user, ['user_name' , 'role'])
}

function getAllUsers() {
  return db('users')
}

function findByUserName(user_name) {
  return db('users')
    .where({user_name})
    .first();
}

function findByID(id) {
  return db('users')
    .where({id})
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