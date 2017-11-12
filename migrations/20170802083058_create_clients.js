"use strict";
/*eslint no-unused-vars: 0*/

exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists("clients", function(table) {
    table.increments();
    table.string("first_name").defaultTo("");
    table.string("last_name").defaultTo("");
    table.string("username").unique();
    table.string("email").unique();
    table.string("hashed_password");
    table.string("avatar");
    table.integer("user_id").unsigned().index().references("id").inTable("users").onDelete("SET NULL");
    table.integer("project_id").unsigned().index().references("id").inTable("projects").onDelete("SET NULL");
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("clients");
};
