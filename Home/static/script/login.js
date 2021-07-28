$('#btn').on("click", function (event) {
    var username = $('#username').val();
    var pw = $('#pass').val();
    var url = window.location.href;
    var csrftoken = $("input[name=csrfmiddlewaretoken]").val();
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8000/log/",
        data: {
            csrfmiddlewaretoken: csrftoken,
            'username': username,
            'password': pw,
        },
        success: function (response) {
            if (response == "done") {
                window.location.href = "http://127.0.0.1:8000/adminsite#";
            } else {
                var warning = document.getElementById("warning");
                warning.removeAttribute("hidden");
            }

        }
    })
});


$(document).keypress(function (event) {
    if (event.keyCode == 13) {
        var username = $('#username').val();
        var pw = $('#pass').val();
        var csrftoken = $("input[name=csrfmiddlewaretoken]").val();
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8000/log/",
            data: {
                csrfmiddlewaretoken: csrftoken,
                'username': username,
                'password': pw,
            },
            success: function (response) {
                if (response == "done") {
                    window.location.href = "http://127.0.0.1:8000/adminsite#";
                } else {
                    var warning = document.getElementById("warning");
                    warning.removeAttribute("hidden");
                }
            }
        })
    }
});