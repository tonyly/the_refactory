# the_refactory

todo

10/16-10/20
- client page

- jenky screen issue
- message feature

Misc.
  - heroku test (with seeds & restart)
  - content update

*************************************

????s
  - saving a json object or an array in DB
  - anonymous?

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
