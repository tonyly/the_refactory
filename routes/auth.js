"use strict";
/*eslint no-unused-vars: 0*/
/*eslint no-dupe-keys: 0*/

const express = require("express");
const router = express.Router();
const knex = require("../db/knex");
const bcrypt = require("bcrypt");
const createAvatar = require("../public/javascripts/octodex_avatar");

router.get("/register", function (req, res, next) {
    res.render("auth/register", {
    });
});

router.get("/login", function (req, res, next) {
    res.render("auth/login", {
    });
});

router.post("/register", function (req, res, next) {
    knex("users").where({
        email: req.body.email
    }).first().then(function(user){
        if(!user){
                let hash = bcrypt.hashSync(req.body.password, 12);
                createAvatar.generateAvatar(function(created_avatar){
                    return knex("users").insert({
                        email: req.body.email,
                        hashed_password: hash,
                        avatar: created_avatar,
                        username: req.body.username,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                    }).then(function (){
                        res.cookie("registered", true);
                        res.redirect("/login");
                    });
                });
        } else {
            res.send("Something went wrong");
        }
    });
});

router.post("/login", function (req, res, next) {
    knex("users").where({
        username: req.body.username
    }).first().then(function (user) {
        if(!user){
            res.send("No user exists");
        } else {
            bcrypt.compare(req.body.password, user.hashed_password, function(err, result) {
                if(result){
                    req.session.user = user;
                    res.clearCookie("registered");
                    res.cookie("loggedin", true);
                    res.redirect("/user");
                } else {
                    res.send("Something went wrong");
                }
            });
        }
    });
});

router.get("/logout", function (req, res) {
    req.session = null;
    res.clearCookie("loggedin");
    res.redirect("/");
});

module.exports = router;
