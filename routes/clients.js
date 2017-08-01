"use strict";
/*eslint no-unused-vars: 0*/
/*eslint no-dupe-keys: 0*/

const express = require("express");
const router = express.Router();
const knex = require("../db/knex");

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
    res.render("clients/home", {
        user: user
  });
  console.log(user);
});
});

router.get("/new", authorizedUser, function(req, res, next) {
  let userID = req.session.user.id;
  knex("users").where("id", userID).first().then(function (user){
    res.render("clients/new", {
        user: user
  });
  console.log(user);
});
});

router.get("/:id", authorizedUser, function(req, res, next) {
  let clientID = req.params.id;
  knex("clients").where("id", clientID).first().then(function (client){
    res.render("clients/single", {
        client: client
  });
  console.log(client);
});
});

router.get("/:id/edit", authorizedUser, function(req, res, next) {
  let clientID = req.params.id;
  knex("clients").where("id", clientID).first().then(function (client){
    res.render("clients/edit", {
        client: client
  });
  console.log(client);
});
});

router.post("/new", function (req, res, next) {
  let userID = req.session.user.username;
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
                      poc: userID,
                      project: req.body.project,
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
      project: req.body.project,
    }).then(function (){
        res.redirect("/clients");
    });
});

module.exports = router;
