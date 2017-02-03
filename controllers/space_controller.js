"use strict";

// Import MySQL connection.
var db = require("../models");
var express = require("express");
var router = express.Router();
var path = require('path');
var passport = require("../config/passport");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

//Route that redirects if user is already logged in
router.get("/", function(req, res) {
    if (req.user) {
        res.redirect("/spaceportfolio/members");
    }
    res.redirect("/spaceportfolio");
});

//Route that checks if user is logged in
router.get("/spaceportfolio/members", isAuthenticated, function(req, res) {
    // Display user's Portfolio
    res.redirect("/spaceportfolio");
});

//Route that checks if user has valid login credentials
router.post("/spaceportfolio/login", passport.authenticate("local"), function(req, res) {
    res.json("/spaceportfolio/members");
});

//Route that creates User, then log user in
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

// Route for getting user data
router.get("/spaceportfolio/user_data", function(req, res) {
    if (!req.user) {
        res.json({});
    } else {
        res.json({
            email: req.user.email,
            id: req.user.id
        });
    }
});

//Route that posts the pics you want to save to the Portfolio table
router.post("/spaceportfolio/save", function(req, res) {
    // console.log("User ID: " + req.body.UserId);
    // console.log("Photo ID: " + req.body.PhotoId);
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

//Route that deletes images you don't want
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



//MAIN ROUTE
//Route that finds and displays all the pictures in the Photo db
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

module.exports = router;