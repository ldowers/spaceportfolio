$(document).ready(function() {
    logout.on("submit", function(event) {
        logoutUser();
    });

    function logoutUser() {
        $.get("/spaceportfolio/logout");
    }
});