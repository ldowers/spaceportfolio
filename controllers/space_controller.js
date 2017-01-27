"use strict";

// Import MySQL connection.
var db = require("../models");
var express = require("express");
var router = express.Router();

//main page
router.get("/", function(req, res) {
    res.redirect("/spaceportfolio");
});

//search
router.get("/spaceportfolio/search", function(req, res) {
    db.Image.findAll({
            where: {
                title: req.body
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
//TODO: double check req.body.user_name, req.body.photoID against db
router.post("/spaceportfolio/save/:name/:photoID", function(req, res) {
    db.User.create({
            name: req.params.user_name,
            photoID: req.params.photoID
        })
        .then(function(dbUser) {
            res.redirect("/spaceportfolio");
        });
});

//delete images you don't want
//TODO: double check what parts of record to delete against db
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