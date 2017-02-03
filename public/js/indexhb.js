$(document).ready(function() {
    $("#portfolio-button").click(function() {
        $("#form-overlay").css({
            "height": "100vh",
            "width": "100vw",
            "opacity": "1"
        });
    });
});



$(document).ready(function() {
    $("#portfolio-button").click(function() {
        $(".hero-h1").css({
            "opacity": "0"
        });
    });
});



$(document).ready(function() {
    $("#portfolio-button").click(function() {
        $(".hero-h2").css({
            "opacity": "0"
        });
    });
});



$(document).ready(function() {
    $("#form-close-btn").click(function() {
        $("#form-overlay").css({
            "height": "0vh",
            "width": "100vw",
            "opacity": "0"
        });
    });
});


$(document).ready(function() {
    $("#form-close-btn").click(function() {
        $("#form-close-btn").css({
            "opacity": "0"
        });
    });
});


$(document).ready(function() {
    $("#form-close-btn").click(function() {
        $(".hero-h1").css({
            "opacity": "1"
        });
    });
});


$(document).ready(function() {
    $("#form-close-btn").click(function() {
        $(".hero-h2").css({
            "opacity": "1"
        });
    });
});

$(document).ready(function() {
    $("#form-submit-btn").click(function() {
        $("body").css({
            "overflow": "auto"
        });
    });
});

$(document).ready(function() {
    $("#form-submit-btn").click(function() {
        $("#form-overlay").css({
            "height": "0vh",
            "width": "100vw",
            "opacity": "0.5"
        });
    });
});

$(document).ready(function() {
    $("#form-submit-btn").click(function() {
        $("body").css({
            "overflow": "auto"
        });
    });
});


$(document).ready(function() {
    $("#form-submit-btn").click(function() {
        $(".hero-h1").css({
            "opacity": "1",
            "margin-top": "20%"
        });
    });
});


$(document).ready(function() {
    $("#form-submit-btn").click(function() {
        $(".hero-h2").css({
            "opacity": "1",
            "margin-bottom": "5%"
        });
    });
});

$("#form-submit-btn").click(function() {
    $('html, body').animate({
        scrollTop: $("#row-1").offset().top
    }, 2000);
});


$("#navbar-search").submit(function() {
    $('html, body').animate({
        scrollTop: $("#row-1").offset().top
    }, 1500);
});


$("#navbar-search").submit(function() {
    $("body").css({
        "overflow": "auto"
    });
});


$("#navbar-search").submit(function() {
    this.reset();
});

$(document).ready(function() {
    $("#search").keydown(function(event) {
        if (event.which === 13) {
            var searchTerm = $(this).val().trim();
            searchTerm = searchTerm.replace(/\s+/g, "").toLowerCase();

            window.location.replace("/spaceportfolio?searchTerm=" + searchTerm + "#row-1");
        }
    });

    $(document).on("click", ".photoSlider", handlePhotoSlider);

    function handlePhotoSlider() {
        console.log("Photo ID: " + $(this).val());
        console.log("Checked: " + $(this).prop('checked'));

        var userID;
        var checked = $(this).prop('checked');
        var photoID = $(this).val();

        $.get("/spaceportfolio/user_data").then(function(data) {
            userID = data.id;
            console.log("User ID: " + userID);
            if (userID && photoID) {
                if (checked) {
                    $.post("/spaceportfolio/save", {
                        UserId: userID,
                        PhotoId: photoID
                    }).then(function(data) {
                        console.log("Photo saved to portfolio");
                    }).catch(function(err) {
                        console.log(err);
                    });
                } else {
                    $.post("/spaceportfolio/delete", {
                        UserId: userID,
                        PhotoId: photoID
                    }).then(function(data) {
                        console.log("Photo deleted from portfolio");
                    }).catch(function(err) {
                        console.log(err);
                    });
                }
            }
        }).catch(function(err) {
            console.log(err);
        });
    }

    //captures logout click and sends down logout route
    $(document).on("click", "#logout-button", handleLogout);

    function handleLogout() {
        console.log("logout clicked");
        $.get("/spaceportfolio/logout")
            .then(function(data) {
                alert("You have been logged out.");
            }).catch(function(err) {
                console.log(err);
            });
    };

    //captures view portfolio click
    $(document).on("click", "#view-portfolio", handleViewPortfolio);

    function handleViewPortfolio() {
        console.log("view portfolio clicked");

        var userID;

        $.get("/spaceportfolio/user_data").then(function(data) {
            userID = data.id;
            console.log("User ID: " + userID);

            if (userID) {
                window.location.replace("/spaceportfolio?UserId=" + userID + "#row-1");
            }

        }).catch(function(err) {
            console.log(err)
        });
    }
}); //end of document ready function