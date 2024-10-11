let userscore = 0 ;
let compscore = 0;
const userScorePara = document.querySelector("#user-score")
const compScorePara = document.querySelector("#comp-score")

const choices = document.querySelectorAll(".choice")
const msg = document.querySelector("#msg")


const genCompChoice = () =>{
    const option = ["rock","paper","scissors"];
    let a = Math.floor(Math.random() * 3);
    return option[a];

}

const drawGame = () =>{

    msg.innerText = "draw";
    msg.style.backgroundColor = "#081b31"
}



const showWinner = (userWin,userChoice,compChoice) =>{
    if(userWin){
        userscore++;
        userScorePara.innerText = userscore;
        console.log("user win");
        msg.innerText = `You win! ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green"
    }
    else{
        compscore++;
        compScorePara.innerText = compscore;
        msg.innerText = `You lose! ${compChoice} beats ${userChoice}`;
        msg.style.backgroundColor = "red"
    }
}

//2nd
const playGame = (userChoice)=>{
    //generating computer choice 
    const compChoice = genCompChoice();

    if(userChoice === compChoice){
        drawGame();
    }
    else{
        let userWin = true;
        if(userChoice ==="rock"){
            userWin = compChoice === "paper" ? false : true;
        }
        else if(userChoice === "paper"){
            userWin = compChoice === "rock"?true : false;
        }
        else{
            userWin = compChoice === "rock"?false :true;
        }
        showWinner(userWin,userChoice,compChoice);
    }
}


//1st
choices.forEach((choice) =>{
    choice.addEventListener("click", () => {
        let userChoice = choice.getAttribute("id");
        console.log(userChoice)
        playGame(userChoice);
    });
});