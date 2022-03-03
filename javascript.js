 //add variables for character and block
 const character = document.getElementById("character");
 const ball = document.getElementById("ball");
 const score = document.getElementById("score");
 const btnJump = document.getElementById("btn-jump");
 const btnStartGame = document.getElementById("btn-start-game");
 const banner = document.getElementById("banner");
 const finalScore = document.getElementById("final-score");
 let runningScore = 0;
 let isGameRunning = false;

 //set banner text
 banner.innerText = "Let's Play!";
 finalScore.innerText = "Jump over the ball";

 //create the jump function
 function jump() {
     //only want to animate if it hasn't been already.
     if(character.classList != "animate"){
         //access the character.grab class list. add animate to it 
         character.classList.add("animate");
     }
     //set timeout so the jump can repeat
     setTimeout(function(){
         //remove the same way we added the class
         character.classList.remove("animate");
     //500 will make it timeout every 500 ms since that's 
     //the length of the animation, but it jumps down too fast so
     //set to 800
     }, 800);
 };

 //*Try to make the ball movement in JavaScript
function startGame() {
    ball.classList.add("animate-ball");
    banner.innerText = "Let's Play!";
    finalScore.innerText = "Jump over the ball";
    document.getElementById("final-score").style.color = "black";
    runningScore = 0;
    isGameRunning = true;
};

btnStartGame.addEventListener("click", e => {
    if(!isGameRunning) {
        startGame();
    }
});

 //add button click function
 btnJump.addEventListener("click", e => {
     jump();
 });

 //add keyboard function
 //space bar makes character jump
 window.addEventListener("keydown", e => {
    
     if(e.key === " "){
         jump();
     }
 });

 setInterval(function didIDie(){
    //get top position of the character and assign it to a variable
    //parse to an int
     let characterPlacement = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
     let ballPosition = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
     //if block hits the character, you lose
     //block between 30 and 50 would be under the character
     //characterTop greater than 100 means it would not clear the block when jumping
     if(ballPosition < 50 && ballPosition > 30  && characterPlacement >= 100){
            gameOver();
     }
 //checkblock runs every 10ms    
 }, 10);

 function gameOver() {
    //stop the animation
    //  ball.style.animation = "none";
    banner.innerText = "Oh no! You got hit!";
    document.getElementById("final-score").style.color = "red";
    finalScore.innerText = "Final Score: " + runningScore;
    ball.classList.remove("animate-ball");
    isGameRunning = false;
 }

// const debug = document.getElementById("debug");
// let scoreFps = 0;
// let lowestPos = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
setInterval(function keepScore(){
    //different scope
    let ballPosition = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));

    //if character jumps over the block, score +1
    //if ball gets to 1px from the left, it successfull made it under the character
    //so 1 point is added to the score
    if(ballPosition < 31){
        runningScore += 1;
    }
    //update the score
    score.innerText = "Score: " + runningScore; 
//check runs every 200ms because it takes the ball 2s to roll all the way    
}, 200);