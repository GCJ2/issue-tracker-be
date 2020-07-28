
exports.up = function(knex) {
  return knex.schema
    .createTable('comments', table => {
      table.increments();
      table.text('comment').notNullable();
      table.integer('createdBy').notNullable()
        .references('id').inTable('users');
      table.integer('issue').notNullable()
        .references('id').inTable('issues');
      table.timestamps(true, true)
    })
  
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('comments')
};
