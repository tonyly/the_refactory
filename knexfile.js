"use strict";
/*eslint no-undef: 0*/

module.exports = {

  development: {
    client: "pg",
    connection: {
      database: "the_refactory-dev",
      host: "localhost"
    }
  },

  test: {
    client: "pg",
    connection: {
      database: "the_refactory-test",
      host: "localhost",
    }
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
  }
};
