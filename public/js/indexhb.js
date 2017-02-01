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
    $("#signUp-btn, #login-btn").click(function() {
        $("body").css({
            "overflow": "auto"
        });
    });
});

$(document).ready(function() {
    $("#signUp-btn, #login-btn").click(function() {
        $("#form-overlay").css({
            "height": "0vh",
            "width": "100vw",
            "opacity": "0.5"
        });
    });
});

$(document).ready(function() {
    $("#signUp-btn").click(function() {
        $("body").css({
            "overflow": "auto"
        });
    });
});


$(document).ready(function() {
    $("#signUp-btn, #login-btn").click(function() {
        $(".hero-h1").css({
            "opacity": "1",
            "margin-top": "20%"
        });
    });
});


$(document).ready(function() {
    $("#signUp-btn, #login-btn").click(function() {
        $(".hero-h2").css({
            "opacity": "1",
            "margin-bottom": "5%"
        });
    });
});

$("#signUp-btn, #login-btn").click(function() {
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
            $(this).val();
            console.log("this.val is " + $(this).val());

            $.post("/spaceportfolio/search", {
                searchTerm: $(this).val()
            }).then(function(data) {
                // window.location.replace(data);
                // If there's an error, log the error
            }).catch(function(err) {
                console.log(err);
            });
        }
    });
});