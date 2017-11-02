"use strict";

const express = require("express");
const router = express.Router();
const knex = require("../db/knex");

router.get("/new", function (req, res, next) {
  let userID = req.session.user.id;
  knex("messages").where("id", clientID).first().then(function (client){
    res.render("client/home", {
      client: client,
    });
    console.log(client)
});
});

module.exports = router;
