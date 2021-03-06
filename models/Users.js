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
  const [id] = await db('users')
    .insert(user, "id");
  return findByID(id)
}

function getAllUsers() {
  return db('users')
    .join('roles', {'users.role': 'roles.id'})
    .select(
      'users.id AS id',
      'user_name AS userName',
      'first_name AS firstName',
      'last_name AS lastName',
      'roles.title AS role')
}

function findByUserName(user_name) {
  return db('users')
    .whereRaw('LOWER(user_name) LIKE ?',
      '%' + user_name.toLowerCase() + '%')
    .join('roles', {'users.role': 'roles.id'})
    .select(
      'users.id AS id',
      'user_name AS userName',
      'password',
      'first_name AS firstName',
      'last_name AS lastName',
      'roles.title AS role')
    .first();
}

function findByID(id) {
  return db('users')
    .join('roles', {'users.role': 'roles.id'})
    .where({'users.id': id})
    .select(
      'users.id AS id',
      'user_name AS userName',
      'password',
      'first_name AS firstName',
      'last_name AS lastName',
      'roles.title AS role')
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