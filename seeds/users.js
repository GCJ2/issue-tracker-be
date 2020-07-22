
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, user_name: 'GCJ2', password: 'hashedPassword1', first_name: 'Greg', last_name: 'Johnston', role: 1},
        {id: 2, user_name: 'CodyyLee', password: 'hashedPassword2', first_name: 'Cody', last_name: 'Lee', role: 2},
        {id: 3, user_name: 'Reececap', password: 'hashedPassword3', first_name: 'Reece', last_name: 'Pierson', role: 3},
        {id: 4, user_name: 'QuieroPizza', password: 'hashedPassword4', first_name: 'Gabe', last_name: 'Anguiano', role: 4},
      ]);
    });
};
