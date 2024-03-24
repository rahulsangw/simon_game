let level=0;
let userChosenColor;
let randomChoosenPattern=[];
let userClickedPattern=[];
let randomNumber=randomNumberGeneration();//random number generated, which will be used to select the color from the array.
let started=false;
let audio;

let arr=["green","red","yellow","blue"];

$(document).on("click",()=>{
    if(!started){
        nextSequence();
        started=true;
    }
});

$(document).on("click",(e)=>{

    userChosenColor = e.target;
    userClickedPattern.push(userChosenColor.id);
    playSound(userChosenColor.id);
    animation(userChosenColor.id);
    console.log("userpattern length:"+ userClickedPattern.length);
    checkAnswer(userClickedPattern.length-1);

});


function randomNumberGeneration(){

    return Math.floor(Math.random()*4);
    
}


function nextSequence(){
    level+=1;
    $("#level-title").text("Level "+level);
   // console.log("Color Pushed: "+arr[randomNumber]);
    userClickedPattern=[];
    randomNumber=randomNumberGeneration();
    randomChoosenPattern.push(arr[randomNumber]);
    //Adding Flashing animation to the randomly selected color
    animation(arr[randomNumber]);
    //Adding sound to the randomly selected Color
    playSound(arr[randomNumber]);

}

function checkAnswer(level){

    console.log("userClickedPattern: "+userClickedPattern);
    console.log("randomChoosePattern: "+randomChoosenPattern);
    console.log("level: "+level);
    if(userClickedPattern[level]==randomChoosenPattern[level]){
        if(userClickedPattern.length===randomChoosenPattern.length){
            setTimeout(()=>{
                nextSequence();
            },1000)
        }
    }else{
        $("body").addClass("game-over");
        audio=new Audio("./sounds/wrong.mp3");
        $("#level-title").text("Game Over, Double Click Anywhere to Restart(Not on Boxes 🫠)");
       
        setTimeout(()=>{
            $("body").removeClass("game-over");
        },200)

        startOver();
    } 
}//end of checkAnswer

function animation(color){
    $("#"+color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}



function playSound(color){

    switch(color){
       
        case "green":
            audio= new Audio("./sounds/green.mp3");
            audio.play();
        break;

        case "blue":
            audio= new Audio("./sounds/blue.mp3");
            audio.play();
        break;

        case "red":
            audio= new Audio("./sounds/red.mp3");
            audio.play();
        break;

        case "yellow":
            audio= new Audio("./sounds/yellow.mp3");
            audio.play();
        break;
        
        default:
            console.log();
    }//end of switch
    
}

function startOver() {
    level=0;
    randomChoosenPattern=[];
    started=false;
}
