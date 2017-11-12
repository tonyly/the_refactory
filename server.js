"use strict";

require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const methodOverride = require("method-override");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");

const auth = require("./routes/auth");
const users = require("./routes/users");
const clients = require("./routes/clients");
const client = require("./routes/client");
const projects = require("./routes/projects");
const admin = require("./routes/admin");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cookieSession({
  secret: process.env.COOKIE_SECRET,
}));
app.use(cookieParser());
app.use(flash());
app.use(function(req, res, next) {
  res.locals.messages = req.flash();
  next();
});

app.use("/users", users);
app.use("/auth", auth);
app.use("/clients", clients);
app.use("/client", client);
app.use("/projects", projects);
app.use("/admin", admin);

app.listen(port, function() {
  console.log("hello from", port);
});

module.exports = app;
