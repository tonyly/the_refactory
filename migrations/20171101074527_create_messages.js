// exports.up = function(knex, Promise) {
//     return knex.schema.createTableIfNotExists("messages", function (table) {
//         table.increments();
//         table.integer("user_id").unsigned().index().references("id").inTable("users").onDelete("SET NULL");
//         table.integer("client_id").unsigned().index().references("id").inTable("clients").onDelete("SET NULL");
//         table.integer("project_id").unsigned().index().references("id").inTable("projects").onDelete("SET NULL");
//         table.string("message");
//         table.timestamps(true, true);
//     });
// };
//
// exports.down = function(knex, Promise) {
//     return knex.schema.dropTableIfExists("messages");
// };


// user can message a client (client_id), post on the project wall (project_id)
// client can message a user (user_id), post on a project wall (project_id)

// admin can edit or delete messages
// messages pop up on nav menu as notifications & badge
// email alert when you get a message
