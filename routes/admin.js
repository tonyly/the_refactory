"use strict";
/*eslint no-unused-vars: 0*/
/*eslint no-dupe-keys: 0*/

const express = require("express");
const router = express.Router();
const knex = require("../db/knex");
const createAvatar = require("../public/javascripts/octodex_avatar");

function authorizedAdmin(req, res, next) {
    let userID = req.session.user.admin === true;
    if(userID){
        next();
    } else {
        res.send("You are not authorized");
    }
}

router.get("/", authorizedAdmin, function(req, res, next) {
  let userID = req.session.user.id;
  knex("users").where("id", userID).first().then(function (user){
    knex("projects").then(function (projects){
      knex("clients").then(function (clients){
        knex("users").then(function (users){
    res.render("admin/home", {
        user: user,
        clients: clients,
        projects: projects,
        users: users,
  });
});
});
});
});
});


module.exports = router;
