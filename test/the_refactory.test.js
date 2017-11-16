"use strict";
/*eslint no-undef: 0*/

const expect = require("chai").expect;
const app = require("../server");
const request = require("supertest")(app);

let admin = {
  username: "cpbuckingham",
  hashed_password: "seed"
};

let user = {
  username: "togo",
  hashed_password: "seed"
};

let client = {
  username: "jreed",
  hashed_password: "password1"
};


//tests to tests
describe("Test the test", function() {
  it("should pass the test", function() {
    expect(true).to.equal(true);
  });
});

//test for landing page
describe("Landing Page", function() {
  it("should display the landing page", function(done) {
    request.get("/")
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        expect(res.text).to.contain("Welcome The_ReFactory");
        done();
      });
  });
});

//test for auth page
describe("Logging on", function() {

  it("should display a single admin profile information", function(done) {
    request.post("/auth/user_login")
      .send(admin)
      .expect(200, done);
  });

  it("should display a single clients profile information", function(done) {
    request.post("/auth/client_login")
      .send(client)
      .expect(200, done);
  });

  it("should display a single users profile information", function(done) {
    request.post("/auth/user_login")
      .send(user)
      .expect(200, done);
  });
});

xdescribe("Logging on", function() {

  it("client page", function(done) {
    request.get("/client")
      .expect(200, done);
  });
  it("client page", function(done) {
    request.get("/users/3")
      .expect(200, done);
  });
  it("client page", function(done) {
    request.get("/admin")
      .expect(200, done);
  });
});


// TO BE CONTINUED


//  it("should display a single users comments", function (done) {
//    request.get("/users/2")
//           .expect(200)
//           .end(function(err, res) {
//             if(err){
//               done(err)
//             }
//             knex("comments").where("user_id", 2).first().then(function(data) {
//               expect(res.text).to.contain(data.content)
//               done();
//             })
//           })
//  })
// })
//
// describe("Posts", function () {
//  it("Should display all of the titles of the posts", function (done) {
//    request.get("/posts")
//           .expect(200)
//           .end(function (err, res) {
//             if(err){
//               done(err);
//             }
//             knex("users").innerJoin("posts", "users.id", "posts.user_id").then(function (posts) {
//               expect(res.text).to.contain(posts[0].title);
//               expect(res.text).to.contain(posts[1].title);
//               expect(res.text).to.contain(posts[2].title);
//               done();
//             })
//           })
//  })
//  it("Should display the author of all of the posts", function (done) {
//    request.get("/posts")
//           .expect(200)
//           .end(function (err, res) {
//             if(err){
//               done(err);
//             }
//             knex("users").innerJoin("posts", "users.id", "posts.user_id").then(function (posts) {
//               expect(res.text).to.contain(posts[0].username);
//               expect(res.text).to.contain(posts[1].username);
//               expect(res.text).to.contain(posts[2].username);
//               done();
//             })
//           })
//  })
//  it("Should display a single post with author and all comments if there are any", function (done) {
//    request.get("/posts/1")
//           .expect(200)
//           .end(function (err, res) {
//             if(err){
//               done(err);
//             }
//             knex("users").select(["users.username", "posts.title", "posts.body", "comments.content"])
//                         .where("posts.id", 1).innerJoin("posts", "users.id", "posts.user_id")
//                         .innerJoin("comments", "users.id", "comments.user_id")
//                         .then(function (post) {
//                             expect(res.text).to.include(post[0].username)
//                             expect(res.text).to.include(post[0].title)
//                             done();
//                           })
//           })
//  })
//  it("Should display a single post with author but no comments if there arent any", function (done) {
//    request.get("/posts/2")
//           .expect(200)
//           .end(function (err, res) {
//             if(err){
//               done(err);
//             }
//             knex("users").select(["users.username", "posts.title", "posts.body", "comments.content"])
//                         .where("posts.id", 2).innerJoin("posts", "users.id", "posts.user_id")
//                         .innerJoin("comments", "users.id", "comments.user_id")
//                         .then(function (post) {
//                             expect(res.text).to.include("there are no comments")
//                             done();
//                           })
//           })
//  })
//
// })
//
// describe("Add Account", function () {
//   after(function (done) {
//     knex("users").where("username", "testing").first().del().then(function(data){
//       done();
//     })
//   })
//  it("Should show the sign up page", function (done) {
//    request.get("/auth/signup")
//           .expect(200)
//           .end(function (err, res) {
//             if(err){
//               done(err)
//             }
//             expect(res.text).to.contain("Sign Up Page");
//             done();
//           })
//  })
//  it("Should add a new account to the database", function (done) {
//    request.post("/auth/signup")
//           .send({
//             username: "testing",
//             email: "test@gmail.com",
//             hashed_password: "partytime"
//           })
//           .end(function (err, res) {
//             if(err){
//               done(err)
//             }
//             knex("users").where("username", "testing").first().then(function (user) {
//               expect(user.username).to.equal("testing");
//               expect(user.email).to.equal("test@gmail.com");
//               expect(user.admin).to.equal(false);
//               done();
//             })
//
//           })
//  })
//  it("Should not add a new account to the database if the username is taken", function (done) {
//    request.post("/auth/signup")
//           .send({
//             username: "marc",
//             email: "marc@gmail.com",
//             hashed_password: "password"
//           })
//           .end(function (err, res) {
//             if(err){
//               done(err)
//             }
//             expect(res.text).to.contain("Redirecting to /users");
//             done();
//           })
//  })
// })
//
// xdescribe("POST comment", function () {
//   after(function (done) {
//     knex("posts").where("content", "This is a test").first().del().then(function (stuff){
//       done();
//     })
//   })
//  it("should add a comment", function (done) {
//   request.post("/posts/1")
//           .send({
//             post_id: 1,
//             content: "This is a test",
//             user_id: 2
//           })
//           .end(function (err, res) {
//             if(err){
//               done(err);
//             }
//             request.get("/posts/1")
//               .expect(200)
//               .end(function (err, res) {
//                 if(err){
//                   done(err);
//                 }
//                 expect(res.text).to.contain("This is a test");
//                 done()
//               })
//           })
//  })
// })
//
// xdescribe("POST post", function () {
//
//  it("should take you to the create new post page", function (done) {
//    request.get("/posts/new")
//           .expect(200)
//           .end(function (err, res) {
//             expect(res.text).to.contain("Add a new post")
//             done();
//           })
//  })
//  it("should POST a new post", function (done) {
//    request.post("/posts")
//           .send({
//             title: "testing",
//             body: 123,
//             user_id: 2
//           })
//           .end(function (err, res) {
//             if(err){
//               done(err)
//             }
//             request.get("/posts")
//                 .expect(200)
//                 .end(function (err, res) {
//                   if(err){
//                     done(err)
//                   }
//                   expect(res.text).to.contain("testing")
//                   done();
//                 })
//           })
//  })
// })
