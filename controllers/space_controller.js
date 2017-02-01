"use strict";

// Import MySQL connection.
var db = require("../models");
var express = require("express");
var router = express.Router();
var path = require('path');
var passport = require("../config/passport");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");



router.get("/", function(req, res) {
    //if user is logged in, sends to /spaceportfolio/members
    if (req.user) {
        res.redirect("/spaceportfolio/members");
    }
    //else redirects to /spaceportfolio
    res.redirect("/spaceportfolio");
});

//uses isAuthenticated to check that a user is ACTUALLY logged in
//then gets user info from db and updates HTML of the page
router.get("/spaceportfolio/members", isAuthenticated, function(req, res) {
    // $(document).ready(function() {
    //     // This file just does a GET request to figure out which user is logged in
    //     // and updates the HTML on the page
    //     $.get("/spaceportfolio/user_data").then(function(data) {
    //         $(".member-name").text(data.email);
    //     });
    // });
})

//the MAIN page
//finds all the pictures in the Photo db and puts them in the html
router.get("/spaceportfolio", function(req, res) {
    // res.sendFile(path.join(__dirname + "/../index.html"));
    db.Photo.findAll({})
        .then(function(data) {
            var hbsObject = {
                photos: data
            };
            res.render('index', hbsObject);
        });
});


// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/spaceportfolio/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/spaceportfolio/members");
});

//creates User
//if created successfully, then log user in
//else send error
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


// Route for getting some data about our user to be used client side
router.get("/spaceportfolio/user_data", function(req, res) {
    if (!req.user) {
        // The user is not logged in, send back an empty object
        res.json({});
    } else {
        // Otherwise send back the user's email and id
        // Sending back a password, even a hashed password, isn't a good idea
        res.json({
            email: req.user.email,
            id: req.user.id
        });
    }
});


//search
router.post("/spaceportfolio/search", function(req, res) {
    console.log("search req.body is" + req.body.searchTerm);
    db.Photo.findAll({
            where: {
                explanation: {
                    $like: '%' + req.body.searchTerm + '%'
                }
            }
        })
        .then(function(dbImage) {
            var hbsObject = {
                photos: dbImage
            };
            res.render("index", hbsObject);
        });
});


//post to database the pics you want to save
router.post("/spaceportfolio/save", function(req, res) {
    //create a new User (name, id), store into Users table

    //in Portfolio, store userID and photoID

    db.Portfolio.create({
            title: req.body.title,
            imageURL: req.body.imageURL,
            description: req.body.description
        })
        .then(function(dbPortfolio) {
            res.redirect("/spaceportfolio");
        });
});

//delete images you don't want
router.delete("/spaceportfolio/delete", function(req, res) {
    db.Portfolio.destroy({
            where: {
                id: req.body.id
            }
        })
        .then(function(dbPortfolio) {
            res.redirect("/spaceportfolio");
        });
});

// Export routes for server.js to use.
module.exports = router;