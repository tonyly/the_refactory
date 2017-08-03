"use strict";
/*eslint no-unused-vars: 0*/
/*eslint no-dupe-keys: 0*/

const express = require("express");
const router = express.Router();
const knex = require("../db/knex");
const createAvatar = require("../public/javascripts/octodex_avatar");

function authorizedUser(req, res, next) {
    let userID = req.session.user.id;
    if(userID){
        next();
    } else {
        res.send("You are not authorized");
    }
}

router.get("/", authorizedUser, function(req, res, next) {
  let userID = req.session.user.id;
  knex("users").where("id", userID).first().then(function (user){
    knex("clients").then(function (clients){
    res.render("clients/home", {
        user: user,
        clients: clients,
  });
  console.log(user);
  console.log(clients);
});
});
});

router.get("/new", authorizedUser, function(req, res, next) {
  let userID = req.session.user.id;
  knex("users").where("id", userID).first().then(function (user){
    knex("projects").then(function (projects){
    res.render("clients/new", {
        user: user,
        projects: projects,
  });
  console.log(user);
  console.log(projects);
});
});
});

router.get("/:id", authorizedUser, function(req, res, next) {
  let userID = req.session.user.id;
  let clientID = req.params.id;
  knex("clients").where("id", clientID).first().then(function (client){
    knex("users").where("id", userID).first().then(function (user){
    res.render("clients/single", {
        user: user,
        client: client,
  });
  console.log(client);
});
});
});

router.delete("/:id", function (req, res, next) {
    let cientID = req.params.id;
    knex("clients").where("id", clientID).del().then(function (deleted) {
        res.redirect("/clients");
    });
});

router.get("/:id/edit", authorizedUser, function(req, res, next) {
  let clientID = req.params.id;
  let user = req.session.user.id;
  knex("clients").where("id", clientID).first().then(function (client){
    knex("projects").then(function (projects){
    res.render("clients/edit", {
        client: client,
        user: user,
        projects: projects,
  });
  console.log(client);
});
});
});

router.post("/new", function (req, res, next) {
  let userID = req.session.user.id;
    knex("clients").where({
        email: req.body.email
    }).first().then(function(client){
        if(!client){
          createAvatar.generateAvatar(function(created_avatar){
                    return knex("clients").insert({
                      first_name: req.body.first_name,
                      last_name: req.body.last_name,
                      email: req.body.email,
                      avatar: created_avatar,
                      user_id: userID,
                      project_id: req.body.project,
                    }).then(function (){
                        res.redirect("/clients");
                    });
                });
        } else {
            res.send("Something went wrong");
        }
    });
});

router.put("/:id", authorizedUser, function (req, res, next) {
    let clientID = req.params.id;
    knex("clients").where("id", clientID).update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      avatar: req.body.avatar,
      project_id: req.body.project,
    }).then(function (){
        res.redirect("/clients");
    });
});

module.exports = router;
