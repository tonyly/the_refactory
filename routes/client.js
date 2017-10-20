"use strict";
/*eslint no-unused-vars: 0*/
/*eslint no-dupe-keys: 0*/

const express = require("express");
const router = express.Router();
const knex = require("../db/knex");
const createAvatar = require("../public/javascripts/octodex_avatar");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");


function authorizedUser(req, res, next) {
    let userID = req.session.user.id;
    if(userID){
        next();
    } else {
        res.send("You are not authorized");
    }
}

router.get("/", function (req, res, next) {
  let clientID = req.session.user.id;
  knex("clients").where("id", clientID).first().then(function (client){
    res.render("client/home", {
      client: client,
    });
    console.log(client)
});
});

router.get("/:id", authorizedUser, function(req, res, next) {
  let userID = req.session.user.id;
  let clientID = req.params.id;
  knex("clients").where("id", clientID).first().then(function (client){
    knex("users").where("id", userID).first().then(function (user){
    res.render("client/single", {
        user: user,
        client: client,
  });
  console.log(client);
});
});
});

router.get("/:id/project", authorizedUser, function(req, res, next) {
  let userID = req.session.user;
  let clientID = req.params.id;
  knex("clients").where("id", userID.id).first().then(function (client){
    knex("clients").where("project_id", userID.project_id).then(function (clients){
    knex.from("projects").innerJoin("clients", "projects.id", "clients.project_id").where("clients.id", userID.id).first().then(function (project){
    res.render("client/project", {
        client: client,
        clients: clients,
        project: project,
  });
  console.log(client);
  console.log("alksjdnflkasjdfkljaslkdjfajsldfjklas");
  console.log(req.params.id);

});
});
});
});

router.get("/:id/edit", authorizedUser, function(req, res, next) {
  let userID = req.session.user.id;
  let clientID = req.params.id;
  knex("clients").where("id", clientID).first().then(function (client){
    knex("users").where("id", userID).first().then(function (user){
    res.render("client/edit", {
        user: user,
        client: client,
  });
  console.log(client);
});
});
});


router.put("/:id", authorizedUser, function (req, res, next) {
    let clientID = req.params.id;
    let hash = bcrypt.hashSync(req.body.password, 12);
    knex("clients").where("id", clientID).update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      email: req.body.email,
      avatar: req.body.avatar,
      project_id: req.body.project,
      hashed_password: hash,

    }).then(function (){
        res.redirect("/client");
    });
});

module.exports = router;
