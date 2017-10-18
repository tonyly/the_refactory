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
    let clientID = req.params.id;
    knex("clients").where("id", clientID).del().then(function (deleted) {
        res.redirect("/clients");
    });
});

router.get("/:id/edit", authorizedUser, function(req, res, next) {
  let clientID = req.params.id;
  let user = req.session.user.id;
  knex("clients").where("id", clientID).first().then(function (client){
    knex.from("projects").innerJoin("clients", "projects.id", "clients.project_id").where("clients.id", clientID).first().then(function (clients_project){
    knex("projects").then(function (projects){
    res.render("clients/edit", {
        client: client,
        user: user,
        projects: projects,
        clients_project: clients_project,
  });
  console.log(clients_project);
});
});
});
});

router.post("/new", function (req, res, next) {
  let userID = req.session.user;
  let smtpTrans, mailOpts
    knex("clients").where({
        email: req.body.email
    }).first().then(function(client){
        if(!client){
          createAvatar.generateAvatar(function(created_avatar){
                    return knex("clients").insert({
                      first_name: req.body.first_name,
                      last_name: req.body.last_name,
                      email: req.body.email,
                      username: req.body.username,
                      avatar: created_avatar,
                      user_id: userID.id,
                      project_id: req.body.project,
                      //password1
                      hashed_password: "$2a$12$65iDLL6bbEuqaz.1dHaJa.un61um2yPYnj3bXoW2WXoyDEF9Ruqs2",

                    }).then(function (){
                      smtpTrans = nodemailer.createTransport({
                          service: "Gmail",
                          auth: {
                              user: process.env.GMAIL_USER,
                              pass: process.env.GMAIL_PASS,
                          }
                      });
                      mailOpts = {
                          from: userID.email,
                          to: req.body.email,
                          subject: "Welcome to The_Refactory",
                          text: "Welcome " + req.body.first_name + " , You have been added as a client to a migration project by our representatives. You can log on here with your username: " + req.body.username + " and a generated password: password1 https://therefactory.herokuapp.com/login ",
                          bcc: process.env.MY_EMAIL,
                      };
                      smtpTrans.sendMail(mailOpts, function (error, response) {
                          if (error) {
                              res.send("email not sent");
                          } else{
                            res.redirect("/clients")
                          }
                      });
                    })
                    });
                } else {
            res.send("Something went wrong");
        }
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
        res.redirect("/clients");
    });
});

module.exports = router;
