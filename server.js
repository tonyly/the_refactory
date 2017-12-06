"use strict";
/*eslint no-undef: 0*/
/*eslint no-console: 0*/

require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");

const auth = require("./routes/auth");
const users = require("./routes/users");
const clients = require("./routes/clients");
const client = require("./routes/client");
const projects = require("./routes/projects");
const admin = require("./routes/admin");
const search = require("./routes/search");

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

app.use("/users", users);
app.use("/auth", auth);
app.use("/clients", clients);
app.use("/client", client);
app.use("/projects", projects);
app.use("/admin", admin);
app.use("/search", search);

app.listen(port, function() {
  console.log("Welcome to the_refactory at port", port);
});

module.exports = app;
