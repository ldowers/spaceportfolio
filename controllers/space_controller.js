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
    // Display user's Portfolio
    res.redirect("/spaceportfolio");
});

//the MAIN page
//finds all the pictures in the Photo db and puts them in the html
router.get("/spaceportfolio/:searchTerm?/:UserId?", function(req, res) {
    // res.sendFile(path.join(__dirname + "/../index.html"));
    if (req.query.UserId) {
        db.Portfolio.findAll({
            where: {
                UserId: req.query.UserId
            }
        }).then(function(data) {
            var photoArray = [];

            for (var i = 0; i < data.length; i++) {
                photoArray.push(data[i].PhotoId);
            };

            console.log(photoArray);

            db.Photo.findAll({
                where: {
                    id: {
                        $in: photoArray
                    }
                }
            }).then(function(data) {
                var hbsObject = {
                    photos: data
                };
                res.render("index", hbsObject);
            });
        });
    } else if (req.query.searchTerm) {
        db.Photo.findAll({
                where: {
                    explanation: {
                        $like: '%' + req.query.searchTerm + '%'
                    }
                }
            })
            .then(function(data) {
                var hbsObject = {
                    photos: data
                };
                res.render("index", hbsObject);
            });
    } else {
        db.Photo.findAll({})
            .then(function(data) {
                var hbsObject = {
                    photos: data
                };
                res.render('index', hbsObject);
            });
    }
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

//post to database the pics you want to save
router.post("/spaceportfolio/save", function(req, res) {
    //Store userID and photoID in Portfolio

    console.log("User ID: " + req.body.UserId);
    console.log("Photo ID: " + req.body.PhotoId);
    var user;
    var photo;

    db.User.findOne({
        where: {
            id: req.body.UserId
        }
    }).then(function(user) {
        console.log("User found");

        db.Photo.findOne({
            where: {
                id: req.body.PhotoId
            }
        }).then(function(photo) {
            console.log("Photo found");

            db.Portfolio.create({
                UserId: user.id,
                PhotoId: photo.id
            }).then(function(dbPortfolio) {
                console.log("Portfolio saved");
                res.json(dbPortfolio);
            }).catch(function(err) {
                res.json(err);
            });
        });
    });
});

//delete images you don't want
router.post("/spaceportfolio/delete", function(req, res) {
    db.Portfolio.destroy({
            where: {
                UserId: req.body.UserId,
                PhotoId: req.body.PhotoId
            }
        })
        .then(function() {
            console.log("Portfolio deleted");
            res.json({});
            // res.redirect("/spaceportfolio");
        }).catch(function(err) {
            res.json(err);
        });
});

// Export routes for server.js to use.
module.exports = router;