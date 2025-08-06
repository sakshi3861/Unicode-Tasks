let secretNumber=Math.floor(Math.random()*100)+1;
let guesses=0;
let i=0;
function checkGuess(){
    if(i<7){
        let userGuesses=document.getElementById('guess').value;
        guesses++;
        if(userGuess>secretNumber){
            document.getElementById('feedback').innerText="Too high!";
        } else if(userGuess<secretNumber){
            document.getElementById('feedback').innerText="Too low!";
        } else{
            document.getElementById('feedback').innerText="Exactly right! You found the number in "+guesses+" guesses";
        }
        i++;
    }
    else{
        document.getElementById('feedback').innerText="You couldn't guess the number in 7 guesses";
    }
}