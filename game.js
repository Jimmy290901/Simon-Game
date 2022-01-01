var levelNum;
var gameActive = false;
var colors = ["green", "red", "yellow", "blue"];
var colorSequence;
var colorChosen;
var i;
var colorClicked;

function generateColor() {
    colorChosen = Math.floor(Math.random()*4);
    colorSequence.push(colors[colorChosen]);
    setTimeout(function() {
        $("#" + colors[colorChosen]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        var audio = new Audio("sounds/" + colors[colorChosen] + ".mp3");
        audio.play();
    }, 1000);
}

$(document).on("keydown", function(event) {
    if (!gameActive) {
        levelNum = 1;
        i = 0;
        colorSequence = [];
        $("body").removeClass("red");
        $("#level-title").text("Level " + levelNum);
        gameActive = true;
        generateColor();
        $(".btn").on("click", function() {
            if (gameActive) {
                colorClicked = this.getAttribute("id");
                $("#" + colorClicked).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
                var audio = new Audio("sounds/" + colorClicked + ".mp3");
                audio.play();
                if (colorSequence[i] != colorClicked) {
                    $("#level-title").text("Game Over, Press Any Key to Restart");
                    gameActive = false;
                    $("body").addClass("red");
                    var audio = new Audio("sounds/wrong.mp3");
                    audio.play();
                }
                else {
                    i++;
                    if (i == colorSequence.length) {
                        i = 0;
                        levelNum++;
                        $("#level-title").text("Level " + levelNum);
                        generateColor();
                    }
                }
            }
        });
    }
});