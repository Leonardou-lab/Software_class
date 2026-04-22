$(document).ready(function () {

    $("#buttonPost").click(function () {
        console.log("Post")
        let first = 0;
        first = $("#input").val();
        valores = { "input": first };
        $.post("http://127.0.0.1:3000/consulta", valores).done(function (data) {

            alert("Data Loaded: " + data);

        });
    });

    $("#buttonGet").click(function () {
        console.log("Get")
        $.get("http://127.0.0.1:3000/consulta").done(function (data) {

            alert("Data Loaded: " + data);

        });
    });






});