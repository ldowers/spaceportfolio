"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var passport = require("./config/passport");
var session = require("express-session");

var PORT = process.env.PORT || 3000;
var app = express();

// Requiring our models for syncing
var db = require("./models");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(process.cwd() + "/public"));
app.use(methodOverride("_method"));

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/space_controller.js");

app.use("/", routes);

// =============================================================
// APOD Client Configuration
// =============================================================
var apod = require('nasa-apod');

var client = new apod.Client({
    apiKey: 'JPXW4jwdZEo1fq1gtEdPYRW9qc6coM21DMI7ODcD',
    conceptTags: true
});

db.Photo.belongsToMany(db.User, { through: db.Portfolio });
db.User.belongsToMany(db.Photo, { through: db.Portfolio });

// Syncing our sequelize models, loading our photos table, and then starting our express app
db.sequelize.sync({ force: true, logging: console.log }).then(function() {
    var d = new Date();
    var i = 1;

    var addRecord = function() {
        client(d).then(function(body) {
            db.Photo.create({
                    copyright: body.copyright,
                    date: body.date,
                    explanation: body.explanation,
                    hdurl: body.hdurl,
                    media_type: body.media_type,
                    service_version: body.service_version,
                    title: body.title,
                    url: body.url
                })
                .then(function() {
                    console.log("Record # " + i + " added to database");
                    i++;
                    if (i <= 10) {
                        d.setDate(d.getDate() - 1);
                        addRecord();
                    } else {
                        console.log("Done");

                        app.listen(PORT, function() {
                            console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
                        });
                        return;
                    }
                });
        });
    };
    addRecord();
});