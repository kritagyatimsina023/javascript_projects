"use strict";
let score = 20;
document.querySelector(".score").textContent = score;
let highscore = 0;
document.querySelector(".highscore").textContent = highscore;
const randomGuessNumber = Math.floor(Math.random() * 21);

const scoreUpdate = function () {
  score--;
  document.querySelector(".score").textContent = score;
};

const scoreLessZero = function () {
  if (score <= 0) {
    document.querySelector(".message").textContent =
      "💣 You lost the game.Restart";
    document.querySelector(".guess").disabled = true;
    document.querySelector(".check").disabled = true;
    document.querySelector(".number").textContent = randomGuessNumber;
    document.querySelector("body").style.backgroundColor = "red";
  }
};

const ifequal = function (guess, message) {
  document.querySelector(".highscore").textContent = score;
  message.textContent = "🎉 Correct Number";
  document.querySelector(".number").textContent = guess;
  document.querySelector("body").style.backgroundColor = "green";
  document.querySelector(".number").style.width = "30rem";
};

console.log(randomGuessNumber);
document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  const message = document.querySelector(".message");

  if (guess == randomGuessNumber) {
    ifequal(guess, message);
  } else if (guess > randomGuessNumber) {
    document.querySelector(".message").textContent = "Too High";
    scoreUpdate();
    scoreLessZero();
  } else if (guess < randomGuessNumber) {
    document.querySelector(".message").textContent = "Too Low";
    scoreUpdate();
    scoreLessZero();
  }
});

const reset = function () {
  document.querySelector("body").style.backgroundColor = "black";
  document.querySelector(".number").textContent = "?";
  document.querySelector(".score").textContent = 20;
  document.querySelector(".highscore").textContent = highscore;
  document.querySelector(".guess").value = "";
  document.querySelector(".message").textContent = "Start guessing....";
};

document.querySelector(".again").addEventListener("click", function () {
  reset();
});
