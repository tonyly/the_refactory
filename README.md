# the_refactory

todo

10/30-11/3

- preventdefault fixes the jenkiness...?
- content update

- sonarqube access & response

*************************************

????s
  - saving a json object or an array in DB
  - anonymous?

  - something/:id/anything/:id >> I figured it out, just make the path, can do user_id as well

more
  - analytics - sonarcube
  - google analytics
  - linter
  - clean up dupes & dead
  - test
  - ssv



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
