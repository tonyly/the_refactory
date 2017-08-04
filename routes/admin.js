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
  let adminID = req.session.user.id;
  knex("users").where("id", adminID).first().then(function (admin){
    knex("projects").then(function (projects){
      knex("clients").then(function (clients){
        knex("users").then(function (users){
    res.render("admin/home", {
        admin: admin,
        clients: clients,
        projects: projects,
        users: users,
  });
});
});
});
});
});


router.get("/user/new", authorizedAdmin, function(req, res, next) {
  let adminID = req.session.user.id;
  knex("users").where("id", adminID).first().then(function (admin){
    res.render("admin/new", {
        admin: admin,
  });
});
});

router.get("/user/:id", authorizedAdmin, function(req, res, next) {
  let adminID = req.session.user.id;
  let userID = req.params.id;
  knex("users").where("id", userID).first().then(function (user){
    knex("users").where("id", adminID).first().then(function (admin){
    res.render("admin/single", {
        user: user,
        admin: admin,
        adminID: adminID,
  });
});
});
});

router.delete("/user/:id", function (req, res, next) {
    let userID = req.params.id;
    knex("users").where("id", userID).del().then(function (deleted) {
        res.redirect("/admin");
    });
});

router.get("/user/:id/edit", authorizedAdmin, function(req, res, next) {
  let adminID = req.session.user.id;
  let userID = req.params.id;
  knex("users").where("id", userID).first().then(function (user) {
    knex("users").where("id", adminID).first().then(function (admin){
    res.render("admin/edit", {
        admin: admin,
        user: user,
  });
});
});
});

router.post("/user/new", function (req, res, next) {
  let adminID = req.session.user.id;
    knex("users").where({
        email: req.body.email
    }).first().then(function(user){
        if(!user){
          createAvatar.generateAvatar(function(created_avatar){
                    return knex("users").insert({
                      first_name: req.body.first_name,
                      admin: false,
                      username: req.body.username,
                      last_name: req.body.last_name,
                      email: req.body.email,
                      hashed_password: req.body.password,
                      avatar: created_avatar,
                    }).then(function (){
                        res.redirect("/admin");
                    });
                });
        } else {
            res.send("Something went wrong");
        }
    });
});

router.put("/user/:id", authorizedAdmin, function (req, res, next) {
    let userID = req.params.id;
    knex("users").where("id", userID).update({
      first_name: req.body.first_name,
      username: req.body.username,
      last_name: req.body.last_name,
      email: req.body.email,
      avatar: req.body.avatar,
      hashed_password: req.body.password,
    }).then(function (){
        res.redirect("/admin");
    });
});

module.exports = router;
