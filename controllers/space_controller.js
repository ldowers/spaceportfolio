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
//redirect ot the"Saving iamges pages"

router.post("/burgers/create", function(req, res) {
    console.log("burgers_controller.js burger_name is: " + req.body.burger_name);
    db.Burger.create({
        burger_name: req.body.burger_name
    })

    .then(function(dbBurger) {
        res.redirect("/burgers");
    });
});

//destroy images you don't want
//redirect to saveing images page
router.put("/burgers/update/:id", function(req, res) {
    db.Burger.update({
        devoured: true,
    }, {
        where: {
            id: req.params.id
        }
    })
    res.redirect("/burgers");
});

//what do you do with your portfolio? - TBD



// Export routes for server.js to use.
module.exports = router;