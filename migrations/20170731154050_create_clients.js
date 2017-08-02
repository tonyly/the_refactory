/*eslint no-unused-vars: 0*/

exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists("clients" ,function (table) {
        table.increments();
        table.string("first_name").defaultTo("");
        table.string("last_name").defaultTo("");
        table.string("email").unique();
        table.string("hashed_password").defaultTo("password1");
        table.string("avatar");
        table.integer("poc");
        // poc is whoever added them (user drop down)
        table.integer("project");
        //project is always assigned at the creation of a client
        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("clients");
};
