# the_refactory

  npm run nibble
  npm test

  Dropdb the_refactory-dev
  Createdb	the_refactory-dev
  Knex migrate:latest
  Knex seed:run
  Psql the_refactory-dev

  Dropdb the_refactory-test
  Createdb	the_refactory-test
  Knex migrate:latest --env test
  Knex seed:run --env test
  Psql the_refactory-test

  ALTER SEQUENCE users_id_seq RESTART WITH 1000;
  ALTER SEQUENCE projects_id_seq RESTART WITH 1000;
  ALTER SEQUENCE clients_id_seq RESTART WITH 1000;

  heroku run knex migrate:latest
  heroku run knex seed:run
  heroku pg:psql --app therefactory
