//alert("Test");
var clicked = "";
$(".squarepiece").click(function () {

    console.log("Clicked: X:" + $(this).attr('data-x') + " Y:" + $(this).attr('data-y'));
    if($(this).html() == ""){
    console.log("This contains nothing. ");
}
    else{
        console.log("This contains:" + $(this).children().first().attr("id"));
    }
});
$(".chesspiece").click(function () {

    console.log($(this).attr("id"));
    if (clicked == "") {
        clicked = $(this).attr("id");
        $("#clickedSpan").html($(this).attr("id"));

    }
    else {
        var fromX = 53;
        var fromY = 2;

        $.ajax({
            url: "/move?fromX=" + fromX + "&fromY=" + fromY
        }).done(function (data) {
            //DATA CAN BE CHANGED TO STRING
            if (data) { 
                location.reload(); //On success reload page.
            }
            else {
                alert("Not Allowed!");
            }
        });
    }
})


function whiteStart() {
    $.ajax({
        url: "/reset"
    }).done(function () {
        window.location = "/";
    });
}

function blackStart() {
    $.ajax({
        url: "/reset?start=black"
    }).done(function () {
        window.location = "/";
    });
}