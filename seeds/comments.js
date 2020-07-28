
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {comment: 'Updated useEffect dependency array', createdBy: 1, issue: 1},
        {comment: 'Test 2', createdBy: 1, issue: 1},
        {comment: 'Test 3', createdBy: 1, issue: 1},
        {comment: 'Updated media queries for mobile', createdBy: 2, issue: 2},
        {comment: 'Removed session cookies and added bcrypt', createdBy: 3, issue: 3},
      ]);
    });
};
