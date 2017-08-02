exports.seed = function ( knex, Promise ) {
    return knex( "users" ).del()
        .then( function () {
            return Promise.all( [
                knex( "users" ).insert( {
                    id: 1,
                    username: "cpbuckingham",
                    email: "cameron.p.buckingham@gmail.com",
                    admin: true,
                    hashed_password: "$2a$12$pA5OaFrIkIr/tQiFDgFKy./6NOqXXUAjhkF0DvB7HnaQszjYWlx86"
                    // password is seed
                    first_name: "Cam",
                    last_name: "Buckingham",
                    avatar: "https://octodex.github.com/images/pacman-ghosts.jpg"
                } ),
                knex( "users" ).insert( {
                    id: 2,
                    username: "lindsey",
                    email: "lindsey.buckingham@gmail.com",
                    admin: false,
                    hashed_password: "$2a$12$pA5OaFrIkIr/tQiFDgFKy./6NOqXXUAjhkF0DvB7HnaQszjYWlx86"
                    // password is seed
                    first_name: "Lindsey",
                    last_name: "Buckingham",
                    avatar: "https://octodex.github.com/images/nyantocat.gif"
                } ),
                knex( "users" ).insert( {
                    id: 3,
                    username: "togo",
                    email: "togo.buckingham@gmail.com",
                    admin: false,
                    hashed_password: "$2a$12$pA5OaFrIkIr/tQiFDgFKy./6NOqXXUAjhkF0DvB7HnaQszjYWlx86"
                    // password is seed
                    first_name: "Togo",
                    last_name: "Buckingham",
                    avatar: "https://octodex.github.com/images/yaktocat.png"
                } )
            ] );
        } );
};
