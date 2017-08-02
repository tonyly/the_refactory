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
    knex("projects").then(function (projects){
    res.render("projects/home", {
        user: user,
        projects: projects,
  });
  console.log(user);
  console.log(projects);
});
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
  let projectID = req.params.id;
  knex("users").where("id", userID).first().then(function (user){
    knex("projects").where("id", projectID).first().then(function (project){
      knex("clients").where("project_id", projectID).then(function (clients){
    res.render("projects/single", {
        user: user,
        project: project,
        clients: clients,
  });
  console.log(project);
});
});
});
});

router.delete("/:id", function (req, res, next) {
    let projectID = req.params.id;
    knex("projects").where("id", projectID).del().then(function (deleted) {
        res.redirect("/projects");
    });
});

router.get("/:id/edit", authorizedUser, function(req, res, next) {
  let projectID = req.params.id;
  let user = req.session.user.id;
  knex("projects").where("id", projectID).first().then(function (project){
    res.render("projects/edit", {
        project: project,
        user: user,
  });
  console.log(project);
});
});

router.post("/new", function (req, res, next) {
  let userID = req.session.user.id;
    knex("projects").where({
        name: req.body.name
    }).first().then(function(project){
        if(!project){
                    return knex("projects").insert({
                      name: req.body.name,
                      description: req.body.description,
                      status: req.body.status,
                      avatar: req.body.avatar,
                      user_id: userID,
                    }).then(function (){
                        res.redirect("/projects");
                  })
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
