"use strict";
/*eslint no-console: 0*/
/*eslint no-undef: 0*/

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
const analytics = require("./routes/analytics");
const projects = require("./routes/projects");
const messages = require("./routes/messages");
const notifications = require("./routes/notifications");
const files = require("./routes/files");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieSession({
    secret: process.env.COOKIE_SECRET,
}));
app.use(cookieParser());
app.use(flash());
app.use(function(req, res, next){
    res.locals.messages = req.flash();
    next();
});

app.use("/users", users);
app.use("/auth", auth);
app.use("/analytics", analytics);
app.use("/projects", projects);
app.use("/messages", messages);
app.use("/notifications", notifications);
app.use("/files", files);

app.listen(port, function () {
    console.log("hello from", port);
});

module.exports = app;
