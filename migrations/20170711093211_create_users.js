/*eslint no-unused-vars: 0*/

exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists("users" ,function (table) {
        table.increments();
        table.boolean("admin").defaultTo(false);
        table.string("username").unique();
        table.string("email").unique();
        table.string("hashed_password");
        table.string("last_name").defaultTo("");
        table.string("first_name").defaultTo("");
        table.string("avatar");
        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("users");
};
