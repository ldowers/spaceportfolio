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

            window.location.replace("/spaceportfolio?searchTerm=" + searchTerm);
        }
    });

    //this on click function triggers when the login button is clicked
    //performs an empty search  
    //does not display search items
    $("form.login").click(function() {
        // $.post("/spaceportfolio/search", {
        //     searchTerm: $(this).val()
        // }).then(function(data) {
        //     // window.location.replace(data);
        //     // If there's an error, log the error
        // }).catch(function(err) {
        //     console.log(err);
        // });
    });

    $(document).on("click", ".photoSlider", handlePhotoSlider);

    function handlePhotoSlider() {
        console.log("Photo ID: " + $(this).val());
        console.log("Checked: " + $(this).prop('checked'));
    }
});