table.string("first_name").defaultTo("");
table.string("last_name").defaultTo("");
table.string("email").unique();
table.string("hashed_password").defaultTo("password1");
table.string("avatar");
table.string("poc");
// poc is whoever added them (user drop down)
table.string("project");
//project is always assigned at the creation of a client
table.timestamps(true, true);

exports.seed = function ( knex, Promise ) {
    return knex( "clients" ).del()
        .then( function () {
            return Promise.all( [
                knex( "clients" ).insert( {
                    id: 1,
                    first_name: "Jon",
                    last_name: "Reed",
                    email: "client1@gmail.com",
                    poc: 2,
                    project: 3,
                } ),
                knex( "clients" ).insert( {
                    id: 2,
                    first_name: "Andrew",
                    last_name: "Pearson",
                    email: "client2@gmail.com",
                    poc: 2,
                    project: 1,
                } ),
                knex( "clients" ).insert( {
                    id: 3,
                    first_name: "Rita",
                    last_name: "Butcher",
                    email: "client3@gmail.com",
                    poc: 2,
                    project: 3,
                } ),
                knex( "clients" ).insert( {
                    id: 4,
                    first_name: "Bruce",
                    last_name: "Learner",
                    email: "client4@gmail.com",
                    poc: 2,
                    project: 3,
                } ),
                knex( "clients" ).insert( {
                    id: 5,
                    first_name: "Joe",
                    last_name: "Ripper",
                    email: "client1@gmail.com",
                    poc: 2,
                    project: 3,
                } ),
                knex( "clients" ).insert( {
                    id: 6,
                    first_name: "Jack",
                    last_name: "Zhang",
                    email: "client1@gmail.com",
                    poc: 2,
                    project: 3,
                } ),
                knex( "clients" ).insert( {
                    id: 7,
                    first_name: "Layne",
                    last_name: "McNish",
                    email: "client1@gmail.com",
                    poc: 2,
                    project: 3,
                } ),
                knex( "clients" ).insert( {
                    id: 8,
                    first_name: "Claire",
                    last_name: "Jones",
                    email: "client1@gmail.com",
                    poc: 2,
                    project: 3,
                } ),
                knex( "clients" ).insert( {
                    id: 9,
                    first_name: "Dean",
                    last_name: "Morrow",
                    email: "client1@gmail.com",
                    poc: 2,
                    project: 3,
                } ),
                knex( "clients" ).insert( {
                    id: 10,
                    first_name: "Angela",
                    last_name: "Hart",
                    email: "client1@gmail.com",
                    poc: 2,
                    project: 3,
                } ),
                knex( "clients" ).insert( {
                    id: 11,
                    first_name: "Sanjay",
                    last_name: "Gupta",
                    email: "client1@gmail.com",
                    poc: 2,
                    project: 3,
                } ),
                knex( "clients" ).insert( {
                    id: 12,
                    first_name: "Frank",
                    last_name: "Fork",
                    email: "client1@gmail.com",
                    poc: 2,
                    project: 3,
                } )
            ] );
        } );
};
