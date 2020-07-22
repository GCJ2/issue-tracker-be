
exports.up = function(knex) {
  return knex.schema
    .createTable('roles', table => {
      table.increments();
      table.string('title');
    })

    .createTable('users', table => {
    table.increments();
    table.string('user_name').notNullable().unique();
    table.string('password').notNullable();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.integer('role').notNullable().unsigned()
      .references('id').inTable('roles')
  })

    .createTable('issues', table => {
      table.increments();
      table.string('title').notNullable();
      table.text('description').notNullable();
      table.string('importance').notNullable();
      table.integer('created_by').notNullable()
        .references('id').inTable('users')
        .onDelete('CASCADE').onUpdate('CASCADE');
      table.integer('last_updated_by').notNullable()
        .references('id').inTable('users')
        .onDelete('CASCADE').onUpdate('CASCADE');
      table.boolean('status').notNullable();
      table.timestamps(true, true);
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('issues')
    .dropTableIfExists('users')
    .dropTableIfExists('roles')
};
