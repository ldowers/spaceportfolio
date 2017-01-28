"use strict";

// Import MySQL connection.
var db = require("../models");
var express = require("express");
var router = express.Router();
var path = require('path');
var passport = require("../config/passport");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

//if a user tries to go to the main page, check if they're already logged in
router.get("/", function(req, res) {
    // If the user is already logged in send them to the create a portfolio page
    if (req.user) {
        res.redirect("spaceportfolio/create");
    }
    //else send them to the signup page
    res.sendFile(path.join(__dirname + "/../public/signup.html"));
});

//if a user tries to go to the login page, check if they're already logged in
router.get("spaceportfolio/login", function(req, res) {
    // If the user is already logged in send them to the create a portfolio page
    if (req.user) {
        res.redirect("/members");
    }
    //else send them to the login page
    res.sendFile(path.join(__dirname + "/../public/login.html"));
});

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access spaceportfolio/create they will be redirected to the signup page
router.get("spaceportfolio/create", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/members.html"));
});


// If the user has valid login credentials, send them to the spaceportfolio/create page.
// Otherwise the user will be sent an error
router.post("/spaceportfolio/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/spaceportfolio/create");
});


// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/spaceportfolio/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
        email: req.body.email,
        password: req.body.password
    }).then(function() {
        res.redirect(307, "/spaceportfolio/login");
    }).catch(function(err) {
        res.json(err);
    });
});


// Route for logging user out
router.get("spaceportfolio/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

//We might not need this:
// // Route for getting some data about our user to be used client side
// app.get("/spaceportfolio/user_data", function(req, res) {
//     if (!req.user) {
//         // The user is not logged in, send back an empty object
//         res.json({});
//     } else {
//         // Otherwise send back the user's email and id
//         // Sending back a password, even a hashed password, isn't a good idea
//         res.json({
//             email: req.user.email,
//             id: req.user.id
//         });
//     }
// });



//search
//how to do search "contains" string?
router.get("/spaceportfolio/search", function(req, res) {
    db.Image.findAll({
            where: {
                explanation: req.body
            }
        })
        .then(function(dbImage) {
            var hbsObject = {
                images: dbImage
            };
            res.render("index", hbsObject);
        });
});





//post to database the pics you want to save
router.post("/spaceportfolio/save/:name/:photoID", function(req, res) {
    //create a new User (name, id), store into Users table

    //in Portfolio, store userID and photoID

    db.User.create({
            name: req.params.user_name,
            photoID: req.params.photoID
        })
        .then(function(dbUser) {
            res.redirect("/spaceportfolio");
        });
});

//delete images you don't want
router.delete("/spaceportfolio/delete/:photoID", function(req, res) {
    db.User.destroy({
            where: {
                photoID: req.params.photoID
            }
        })
        .then(function(dbUser) {
            res.redirect("/spaceportfolio");
        });
});

// Export routes for server.js to use.
module.exports = router;