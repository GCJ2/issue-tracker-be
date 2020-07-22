exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('issues').del()
    .then(function () {
      // Inserts seed entries
      return knex('issues').insert([
        {
          id: 1,
          title: 'Infinite Loop in UserDisplay Component',
          description: 'useEffect on line 16 triggers infinite loop',
          importance: 'Dire',
          created_by: 1,
          last_updated_by: 3,
          status: true,
          assigned_to: 2
        },
        {
          id: 2,
          title: 'CSS issues in Header',
          description: 'Header not responding to media queries',
          importance: 'Minor',
          created_by: 1,
          last_updated_by: 2,
          status: true,
          assigned_to: 3
        },
        {
          id: 3,
          title: 'JSON Web Tokens Not Active',
          description: 'JSON Web Tokens need to replace session cookies',
          importance: 'Major',
          created_by: 2,
          last_updated_by: 1,
          status: false,
          assigned_to: 4
        },
      ]);
    });
};
