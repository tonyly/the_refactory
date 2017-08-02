/*eslint no-unused-vars: 0*/

exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists("projects" ,function (table) {
        table.increments();
        table.string("name").defaultTo("");
        table.string("description").defaultTo("");
        table.string("status").defaultTo("");
        table.string("avatar").defaultTo("");
        table.integer("user_id").unsigned().index().references("id").inTable("users").onDelete("CASCADE");
        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("projects");
};
