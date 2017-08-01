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
    res.render("projects/home", {
        user: user
  });
  console.log(user);
});
});

router.get("/new", authorizedUser, function(req, res, next) {
  let userID = req.session.user.id;
  knex("users").where("id", userID).first().then(function (user){
    res.render("projects/new", {
        user: user
  });
  console.log(user);
});
});

router.get("/:id", authorizedUser, function(req, res, next) {
  let userID = req.session.user.id;
  knex("users").where("id", userID).first().then(function (user){
    res.render("projects/single", {
        user: user
  });
  console.log(user);
});
});

router.get("/:id/edit", authorizedUser, function(req, res, next) {
  let userID = req.session.user.id;
  knex("users").where("id", userID).first().then(function (user){
    res.render("projects/edit", {
        user: user
  });
  console.log(user);
});
});

router.post("/new", function (req, res, next) {
    knex("projects").where({
        name: req.body.name
    }).first().then(function(project){
        if(!project){
                createAvatar.generateAvatar(function(created_avatar){
                    return knex("projects").insert({
                      name: req.body.name,
                      description: req.body.description,
                      status: req.body.status,
                      avatar: req.body.avatar,
                    }).then(function (){
                        res.redirect("/projects");
                    });
                });
        } else {
            res.send("Something went wrong");
        }
    });
});

router.put("/:id", authorizedUser, function (req, res, next) {
    let projectID = req.params.id;
    knex("projects").where("id", projectID).update({
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
      avatar: req.body.avatar,
    }).then(function (){
        res.redirect("/projects");
    });
});

module.exports = router;
