var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var count=0;
var started = false;




// THIS IS A LISTENER THAT LISTS THE BUTTON FOR THE CLICK AND WHICHEVER BUTTON IS CLICK IT RETURNS IT'S ID

$(".btn").on('click', function() {
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});


$(document).on("keypress", function(){
    if(!started)
     {
     started= true;
     nextSequence();
    }
 });

 function nextSequence() 
{
    var randomNumber = Math.floor(Math.random()*4); // Generate random index from 0 to 3
    console.log(randomNumber);

    var randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor); // Add the chosen color to gamePattern array

    // Flash the chosen color button
    playSound(randomChosenColor);

    count++;
    $('h1').text('Level ' + count);
}
 

function playSound(userChosenColor)
{
    switch (userChosenColor) 
    {
        case "red":
            $("#red").fadeOut(50).fadeIn(50);
            var audio = new Audio('./sounds/red.mp3');
            audio.play();
            break;
        
        case "green":
            $("#green").fadeOut(50).fadeIn(50);
            var audio = new Audio('./sounds/green.mp3');
            audio.play();
            break;

        case "yellow":
            $("#yellow").fadeOut(50).fadeIn(50);
            var audio = new Audio('./sounds/yellow.mp3');
            audio.play();
            break;

        case "blue":
            $("#blue").fadeOut(50).fadeIn(50);
            var audio = new Audio('./sounds/blue.mp3');
            audio.play();
            break;

        default:
            var audio = new Audio('./sounds/wrong.mp3');
            audio.play();
            break;
    }
}



function animatePress(userChosenColor)
{
    $('#'+userChosenColor).addClass("pressed");

    //SET-TIMEOUT TAKES A HANDLER FUNCTION AND TIME in millisecond THAT IT NEEDS TO WAIT BEFORE EXECUTING IT

    setTimeout( function(){$('#'+userChosenColor).removeClass("pressed")},50);  
}




// ADDING A KEYPRESS LISTENER TO ENTIRE DOCUMENT LISTENING FOR KEYDOWN EVENT





function checkAnswer(currentLevel)
{   
    console.log("user " + userClickedPattern[currentLevel - 1]);
    console.log("game " + gamePattern[ currentLevel- 1 ]);

    if(userClickedPattern[currentLevel] === gamePattern[ currentLevel])
    {
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function(){ userClickedPattern =[]; nextSequence() ;}, 1000);
        }
    }

    else
    {
        var audio = new Audio('./sounds/wrong.mp3');
        audio.play();
                
        $('h1').text("Game Over, Press Any Key to Restart");
        $('body').addClass("game-over");
        setTimeout( function(){$('body').removeClass("game-over");},200);  
        startOver();
    }

}

function startOver()
{
    count = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}
