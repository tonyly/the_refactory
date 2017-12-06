"use strict";
/*eslint no-unused-vars: 0*/
/*eslint no-undef: 0*/

const express = require("express");
const router = express.Router();
const knex = require("../db/knex");

function authorizedAdmin(req, res, next) {
  let userID = req.session.user.admin === true;
  if (userID) {
    next();
  } else {
    res.send("You are not authorized");
  }
}

router.get("/", authorizedAdmin, function(req, res, next) {
  let userID = req.session.user.id;
  knex("users").where("id", userID).first().then(function(user) {
    res.render("search/home", {
      user: user,
    });
  });
});

module.exports = router;
