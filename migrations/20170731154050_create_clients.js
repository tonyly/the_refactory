/*eslint no-unused-vars: 0*/

exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists("clients" ,function (table) {
        table.increments();
        table.boolean("first_name").defaultTo("");
        table.boolean("last_name").defaultTo("");
        table.string("email").unique();
        table.string("hashed_password").defaultTo("password1");
        table.string("avatar");
        table.string("poc");
        // poc is whoever added them (user drop down)
        table.integer("project");
        //project is always assigned at the creation of a client
        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("clients");
};
