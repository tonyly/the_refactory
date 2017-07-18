"use strict";
/*eslint no-unused-vars: 0*/

const express = require("express");
const router = express.Router();
const knex = require("../db/knex");
const bcrypt = require("bcrypt");

function authorizedUser(req, res, next) {
    let userID = req.session.user.id;
    if(userID){
        next();
    } else {
        res.send("You are not authorized");
    }
}

router.get("/:id", authorizedUser, function(req, res, next) {
  let userID = req.session.user.id;
  knex("users").where("id", userID).first().then(function (user){
    res.render("user/dashboard", {
        user: user
  });
  console.log(user);
});
});

router.get("/:id/edit", authorizedUser, function(req, res, next) {
  let userID = req.session.user.id;
  knex("users").where("id", userID).first().then(function (user){
    res.render("user/edit", {
        user: user
  });
  console.log(user);
});
});

router.put("/:id", authorizedUser, function (req, res, next) {
    let userID = req.session.user.id;
    let hash = bcrypt.hashSync(req.body.password, 12);
    knex("users").where("id", userID).update({
      email: req.body.email,
      hashed_password: hash,
      avatar: req.body.avatar,
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    }).then(function (){
        res.redirect("/users/"+userID);
    });
});

module.exports = router;
