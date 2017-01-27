"use strict";

// Import MySQL connection.
var db = require("../models");
var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
    res.redirect("/spaceportfolio");
});

//main page
router.get("/spaceportfolio", function(req, res) {
    db.Space.findAll({})
        .then(function(dbSpace) {
            var hbsObject = {
                images: dbSpace
            };
            res.render("index", hbsObject);
        });
});

//post to database the pics you want to save
//TODO: double check req.body.userID, req.body.user_name, req.body.photoID against db
router.post("/space/save/:user_name", function(req, res) {
    db.Space.create({
            user_name: req.params.user_name,
            photoID: req.body.photoID
        })
        .then(function(dbSpace) {
            res.redirect("/spaceportfolio");
        });
});

//delete images you don't want
//TODO: double check what parts of record to delete against db
router.delete("/space/delete/:user_name", function(req, res) {
    db.Space.destroy({
            where: {
                photoID: req.body.photoID
            }
        })
        .then(function(dbSpace) {
            res.redirect("/spaceportfolio");
        });
});

// Export routes for server.js to use.
module.exports = router;