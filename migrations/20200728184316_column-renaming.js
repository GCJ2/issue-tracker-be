
exports.up = function(knex) {
  return knex.schema
    .table('users', table => {
    table.renameColumn('user_name', 'userName');
    table.renameColumn('first_name', 'firstName');
    table.renameColumn('last_name', 'lastName');
  })
    .table('issues', table => {
      table.renameColumn('created_by', 'createdBy');
      table.renameColumn('last_updated_by', 'lastUpdatedBy');
      table.renameColumn('assigned_to', 'assignedTo');
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropColumn('users')
    .dropColumn('issues')

};
