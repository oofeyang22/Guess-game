const inputs= document.querySelector(".inputs");
const resetBtn= document.querySelector("#reset-btn");
const inputCheck= document.querySelector(".input-check");
const hint= document.querySelector(".tip span");
let wrongLetter= document.querySelector(".wrong span");
const guessLeft= document.querySelector(".guess span");
const countDown= document.querySelector(".time span");

let word;
let maxGuesses;
let corrects=[];
let incorrects= [];
let timer;

let gameTimer= guessTime => {
    clearInterval(timer)
    timer= setInterval(()=>{
        if(guessTime>0){
            guessTime--;
            return countDown.innerText= guessTime;
        }
        clearInterval(timer);
        randomWord();
    },1000)
}


function randomWord(){
    gameTimer(60);
    let randObj= wordBook[Math.floor(Math.random() * wordBook.length)];
    word= randObj.word;
    hint.innerText= randObj.hint;
    maxGuesses= 8;
    corrects=[];
    incorrects=[];
    guessLeft.innerText= maxGuesses;
    wrongLetter.innerText= incorrects;

    let info= "";

    for(let i=0; i<word.length; i++){
        info += `<input type="text" disabled/>`
    }
    inputs.innerHTML= info;
}
randomWord();

function startGame(e){
    let key= e.target.value;

    if(key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key}`) && !corrects.includes(key)){// prevent user from typing same letter twice
        console.log(key)
        if(word.includes(key)){// if letter found in word
            for(let i=0; i<word.length; i++){
                //showing matched letter in input value
                if(word[i]=== key){
                    corrects.push(key);
                    inputs.querySelectorAll("input")[i].value= key;
                }
            }
        }else{
            maxGuesses--; //decrement maxguesses by 1
            incorrects.push(` ${key}`); //add space btw letters
        }
        guessLeft.innerText= maxGuesses;
        wrongLetter.innerText= incorrects
    }
    inputCheck.value=""; //emptying the input once a letter is typed

    setTimeout(() => {
        if(corrects.length=== word.length){//if all letters are found
            alert(`congrats! you found the word ${word.toUpperCase()}`);
            randomWord();
        }else if(maxGuesses < 1){//if user couldn't find all letters
            alert(`Game over, you have no more guesses`);
            for(let i=0; i<word.length; i++){
                //show all letters in input
                inputs.querySelectorAll("input")[i].value= word[i];
            }
        }
    },1000);
}

resetBtn.addEventListener("click", randomWord);
inputCheck.addEventListener("input", startGame);
document.addEventListener("keydown", () => inputCheck.focus());


inputs.addEventListener("click", () => inputCheck.focus())

const arr= ["boy", "girl"]
console.log(arr[1])