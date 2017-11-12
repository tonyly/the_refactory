# the_refactory

todo

November -

- gulp

- order on page load for the jenkiness...?
- test

- sonarqube access & response >> florian

*************************************

????s
  - saving a json object or an array in DB
  - anonymous?

  - something/:id/anything/:id >> I figured it out, just make the path, can do user_id as well


  npm run nibble

  Dropdb the_refactory-dev
  Createdb	the_refactory-dev
  Knex migrate:latest
  Knex seed:run
  Psql the_refactory-dev

  ALTER SEQUENCE users_id_seq RESTART WITH 1000;
  ALTER SEQUENCE projects_id_seq RESTART WITH 1000;
  ALTER SEQUENCE clients_id_seq RESTART WITH 1000;

  heroku run knex migrate:latest
  heroku run knex seed:run
  heroku pg:psql --app therefactory
