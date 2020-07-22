
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('roles').del()
    .then(function () {
      // Inserts seed entries
      return knex('roles').insert([
        {id: 1, title: 'Admin'},
        {id: 2, title: 'Manager'},
        {id: 3, title: 'Developer'},
        {id: 4, title: 'Guest'}
      ]);
    });
};
