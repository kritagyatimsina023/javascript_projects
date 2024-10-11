let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".reset");
let message_container = document.querySelector(".message_container");
let message = document.querySelector(".message");
let new_game_btn = document.querySelector(".new_game_btn");
let game_draw = document.querySelector(".game_draw");

let turnO = true;

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("clicked");
        if (turnO == true) {
            box.innerText = "O";
            turnO = false;
        }
        else {
            box.innerText = "X";
            turnO = true
        }
        box.disabled = true;
        checkWinner();
    });
});


const checkWinner = () => {
    for (patterns of winPattern) {
        let pos1 = boxes[patterns[0]].innerText;
        let pos2 = boxes[patterns[1]].innerText;
        let pos3 = boxes[patterns[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 == pos2 && pos2 == pos3) {
                console.log("winner", pos1)
                Winner(pos1);
            }
        
        }


    }
}

const enabled_box = () => {
    for (box of boxes) {
        box.disabled = false;
        box.innerText = ""
    }
}





const disabled_box = () => {
    for (box of boxes) {
        box.disabled = true;

    }
}



const reset_game = () => {
    turnO = true;
    enabled_box();
    message_container.classList.add("hide");
}



const Winner = (winner) => {
    message.innerText = `congrates you are the winner of this game ${winner}`;
    message_container.classList.remove("hide");
    disabled_box();
    
}
resetbtn.addEventListener("click", reset_game);
new_game_btn.addEventListener("click", reset_game)