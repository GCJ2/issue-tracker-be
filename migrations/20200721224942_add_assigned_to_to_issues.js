
exports.up = function(knex) {
  return knex.schema.table('issues', table => {
    table.integer('assigned_to')
      .references('id').inTable('users');
  })
};

exports.down = function(knex) {
  return knex.schema.table('issues', table => {
    table.dropColumn('assigned_to')
  })
};
