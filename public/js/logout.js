$(document).ready(function() {
    var logoutButton = $("#logout");

    logoutButton.on("submit", function(event) {
        logoutUser();
    });

    function logoutUser() {
        $.get("/spaceportfolio/logout");
    }
});