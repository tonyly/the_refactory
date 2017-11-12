"use strict";
/*eslint no-unused-vars: 0*/
/*eslint no-undef: 0*/

const express = require("express");
const router = express.Router();
const knex = require("../db/knex");
const nodemailer = require("nodemailer");

function authorizedUser(req, res, next) {
  let userID = req.session.user.id;
  if (userID) {
    next();
  } else {
    res.send("You are not authorized");
  }
}

router.get("/", authorizedUser, function(req, res, next) {
  let userID = req.session.user.id;
  knex("users").where("id", userID).first().then(function(user) {
    knex("projects").then(function(projects) {
      res.render("projects/home", {
        user: user,
        projects: projects,
      });
    });
  });
});

router.get("/new", authorizedUser, function(req, res, next) {
  let userID = req.session.user.id;
  knex("users").where("id", userID).first().then(function(user) {
    res.render("projects/new", {
      user: user
    });
  });
});

router.get("/:id", authorizedUser, function(req, res, next) {
  let userID = req.session.user.id;
  let projectID = req.params.id;
  knex("users").where("id", userID).first().then(function(user) {
    knex("projects").where("id", projectID).first().then(function(project) {
      knex("clients").where("project_id", projectID).then(function(clients) {
        res.render("projects/single", {
          user: user,
          project: project,
          clients: clients,
        });
      });
    });
  });
});

router.delete("/:id", function(req, res, next) {
  let projectID = req.params.id;
  knex("projects").where("id", projectID).del().then(function(deleted) {
    res.redirect("/projects");
  });
});

router.get("/:id/edit", authorizedUser, function(req, res, next) {
  let projectID = req.params.id;
  let user = req.session.user.id;
  knex("projects").where("id", projectID).first().then(function(project) {
    res.render("projects/edit", {
      project: project,
      user: user,
    });
  });
});

router.post("/new", function(req, res, next) {
  let userID = req.session.user;
  let smtpTrans, mailOpts;
  knex("projects").where({
    name: req.body.name
  }).first().then(function(project) {
    if (!project) {
      return knex("projects").insert({
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        avatar: req.body.avatar,
        user_id: userID.id,

      }).then(function() {
        smtpTrans = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
          }
        });
        mailOpts = {
          from: userID.email,
          to: userID.email,
          subject: "You have Created a Project on The_Refactory",
          text: "You have created a project called " + req.body.name,
          bcc: process.env.MY_EMAIL,
        };
        smtpTrans.sendMail(mailOpts, function(error, response) {
          if (error) {
            res.send("email not sent");
          }
        });
      }).then(function() {
        res.redirect("/projects");
      });
    } else {
      res.send("Something went wrong");
    }
  });
});

router.put("/:id", authorizedUser, function(req, res, next) {
  let projectID = req.params.id;
  knex("projects").where("id", projectID).update({
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
    avatar: req.body.avatar,
  }).then(function() {
    res.redirect("/projects");
  });
});

module.exports = router;
