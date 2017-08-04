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
  let userID = req.session.user.id;
  knex("users").where("id", userID).first().then(function (user){
    knex("projects").then(function (projects){
      knex("clients").then(function (clients){
        knex("users").then(function (users){
    res.render("admin/home", {
        user: user,
        clients: clients,
        projects: projects,
        users: users,
  });
});
});
});
});
});


// router.get("/user/new", authorizedAdmin, function(req, res, next) {
//   let userID = req.session.user.id;
//   knex("users").where("id", userID).first().then(function (user){
//     res.render("admin/new", {
//         user: user,
//   });
// });
// });
//
// router.get("/user/:id", authorizedAdmin, function(req, res, next) {
//   let adminID = req.session.user.id;
//   let userID = req.params.id;
//   knex("users").where("id", userID).first().then(function (user){
//     knex("users").where("id", adminID).first().then(function (admin){
//     res.render("admin/single", {
//         user: user,
//         admin: admin,
//   });
// });
// });
// });
//
// router.delete("/user/:id", function (req, res, next) {
//     let userID = req.params.id;
//     knex("users").where("id", userID).del().then(function (deleted) {
//         res.redirect("/admin");
//     });
// });
//
// router.get("/user/:id/edit", authorizedAdmin, function(req, res, next) {
//   let clientID = req.params.id;
//   let user = req.session.user.id;
//   knex("clients").where("id", clientID).first().then(function (client){
//     knex("projects").then(function (projects){
//     res.render("clients/edit", {
//         client: client,
//         user: user,
//         projects: projects,
//   });
//   console.log(client);
// });
// });
// });
//
// router.post("/user/new", function (req, res, next) {
//   let userID = req.session.user.id;
//     knex("clients").where({
//         email: req.body.email
//     }).first().then(function(client){
//         if(!client){
//           createAvatar.generateAvatar(function(created_avatar){
//                     return knex("clients").insert({
//                       first_name: req.body.first_name,
//                       last_name: req.body.last_name,
//                       email: req.body.email,
//                       avatar: created_avatar,
//                       user_id: userID,
//                       project_id: req.body.project,
//                     }).then(function (){
//                         res.redirect("/clients");
//                     });
//                 });
//         } else {
//             res.send("Something went wrong");
//         }
//     });
// });
//
// router.put("/user/:id", authorizedAdmin, function (req, res, next) {
//     let clientID = req.params.id;
//     knex("clients").where("id", clientID).update({
//       first_name: req.body.first_name,
//       last_name: req.body.last_name,
//       email: req.body.email,
//       avatar: req.body.avatar,
//       project_id: req.body.project,
//     }).then(function (){
//         res.redirect("/clients");
//     });
// });

module.exports = router;
