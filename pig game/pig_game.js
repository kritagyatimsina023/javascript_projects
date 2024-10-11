"use strict";
let player_1_score = document.querySelector("#score--0");
let player_2_score = document.querySelector("#score--1");
let dice = document.querySelector(".dice");
let btn_roll = document.querySelector(".btn--roll");
let current_1 = document.querySelector("#current--0");
let current_2 = document.querySelector("#current--1");
let player_section_1 = document.querySelector(".player--0");
let player_section_2 = document.querySelector(".player--1");
let btn_hold = document.querySelector(".btn--hold");
let new_game_btn = document.querySelector(".btn--new");

player_1_score.textContent = 0;
player_2_score.textContent = 0;
dice.classList.add("hidden");
let currentScore = 0;
let scores = [0, 0];
let activePlayer = 0;

new_game_btn.addEventListener("click", function () {
  player_1_score.textContent = 0;
  player_2_score.textContent = 0;
  current_1.textContent = 0;
  current_2.textContent = 0;
  scores = [0, 0];
  currentScore = 0;
  btn_roll.disabled = false;
  btn_hold.disabled = false;
  dice.classList.add("hidden");
  player_section_1.classList.add("player--active");
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");

  //   player_section_1.classList.add("player--active");
});

const switchplayer = function () {
  checkwinner();
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player_section_1.classList.toggle("player--active");
  player_section_2.classList.toggle("player--active");
};

btn_roll.addEventListener("click", function () {
  const dice_num = Math.floor(Math.random() * 6) + 1;
  dice.classList.remove("hidden");
  const rolled_dice = (dice.src = `dice-${dice_num}.png`);
  if (dice_num != 1) {
    currentScore += dice_num;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else if (dice_num == 1) {
    switchplayer();
  }
});

// const disablebtn = function () {
//   player_section_1.classList.remove("player--active");
//   player_section_2.classList.remove("player--active");
// };

const checkwinner = function () {
  if (scores[activePlayer] >= 10) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    const winner = document.querySelector(`#name--${activePlayer}`).innerHTML;
    console.log(winner);
    btn_roll.disabled = true;
    btn_hold.disables = true;
  }
};

btn_hold.addEventListener("click", function () {
  scores[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];
  switchplayer();
  checkwinner();
});
