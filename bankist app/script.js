"use strict";
// const account1 = {
//   owner: "Jonas Schmedtmann",
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: "Jessica Davis",
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: "Steven Thomas Williams",
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: "Sarah Smith",
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2024-01-18T21:31:17.178Z",
    "2024-02-23T07:42:02.383Z",
    "2024-10-24T09:15:04.904Z",
    "2024-10-18T10:17:24.185Z",
    "2024-10-19T14:11:59.604Z",
    "2024-10-21T17:01:17.194Z",
    "2024-10-20T23:36:17.929Z",
    "2024-10-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

console.log(accounts);

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

//display movements

const formattedDates = function (now, locale) {
  const dayAgo = (day1, day2) =>
    Math.round(Math.abs((day2 - day1) / (1000 * 60 * 60 * 24)));
  const passedDay = dayAgo(new Date(), now);
  console.log(passedDay);
  if (passedDay === 0) return "today";
  if (passedDay <= 7) {
    return `${passedDay} days's ago`;
  }
  // const day = `${now.getDate()}`.padStart(2, 0);
  // const month = `${now.getMonth() + 1}`.padStart(2, 0);
  // const year = now.getFullYear();
  return new Intl.DateTimeFormat(locale).format(now);
};
const formattedCurrency = function (value, locale, curr) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: curr,
  }).format(value);
};

const displaymovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const now = new Date(acc.movementsDates[i]);
    const displayDates = formattedDates(now, acc.locale);
    const formattedCurr = formattedCurrency(mov, acc.locale, acc.currency);
    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
     <div class="movements__date">${displayDates}</div>
          <div class="movements__value">${formattedCurr}</div>
        </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// displays current balance
const calcAndPrintBalance = function (acc) {
  const balance = acc.movements.reduce((acc, curr) => acc + curr, 0);
  acc.balance = balance;
  console.log(acc);
  labelBalance.textContent = formattedCurrency(
    acc.balance,
    acc.locale,
    acc.currency
  );
};
const logouttimer = function () {
  const timeInst = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(Math.trunc(time % 60)).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    if (time == 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }
    time--;
  };
  let time = 600;
  timeInst();
  const timer = setInterval(timeInst, 1000);
  return timer;
};

// displays summary of interest in out
const createDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = formattedCurrency(incomes, acc.locale, acc.currency);
  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((accu, mov) => accu + mov);
  labelSumOut.textContent = formattedCurrency(
    Math.abs(out),
    acc.locale,
    acc.currency
  );
  //interest of deposited amount
  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * acc.interestRate) / 100)
    .filter((mov) => mov >= 1) // bank only pays if interest >=1
    .reduce((acc, mov) => acc + mov);
  labelSumInterest.textContent = formattedCurrency(
    interest,
    acc.locale,
    acc.currency
  );
};

// account owner Short form login
const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLocaleLowerCase()
      .split(" ")
      .map((curr) => curr.at(0)) //returning
      .join("");
  });
};
createUserName(accounts);

const updateUI = function (acc) {
  displaymovements(acc);

  //display balance
  calcAndPrintBalance(acc);

  //display summary
  createDisplaySummary(acc);
};

let currentAccount;
let timing;
//always logged in
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 1;
// const option = {
//   hour: "numeric",
//   minutes: "numeric",
//   month: "long",
//   day: "numeric",
//   year: "numeric",
// };
// const new_date = new Date();
// const locale = navigator.language;
// labelDate.textContent = new Intl.DateTimeFormat(locale, option).format(
//   new_date
// );

btnLogin.addEventListener("click", function (ev) {
  ev.preventDefault();

  if (timing) clearInterval(timing);
  timing = logouttimer();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === +inputLoginPin.value) {
    //display UI and message
    labelWelcome.innerHTML = `Welcome Back ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 1;

    const option = {
      hour: "numeric",
      minutes: "numeric",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const new_date = new Date();
    const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      option
    ).format(new_date);
    //clearing input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    //display movements
    updateUI(currentAccount);
  } else {
    containerApp.style.opacity = 0;
  }
});

//transfering amount
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Math.floor(inputTransferAmount.value);
  const transferAmountUser = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  if (
    amount > 0 &&
    transferAmountUser &&
    currentAccount.balance >= amount &&
    transferAmountUser.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    transferAmountUser.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    transferAmountUser.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);
    inputTransferTo.value = inputTransferAmount.value = "";
  }
  clearInterval(timing);
  timing = logouttimer();
});
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const loanAmount = +inputLoanAmount.value;
  if (
    loanAmount > 0 &&
    currentAccount.movements.some((mov) => mov >= loanAmount * 0.1)
  )
    setTimeout(function () {
      currentAccount.movements.push(loanAmount);
      currentAccount.movementsDates.push(new Date().toISOString());
      updateUI(currentAccount);
    }, 2500);
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === inputCloseUsername.value
    );
    console.log(index);

    //deleting account (i.e logOut)
    accounts.splice(index, 1);
    inputCloseUsername.value = "";
    console.log(accounts);
    containerApp.style.opacity = 0;
  }
  clearInterval(timing);
  timing = logouttimer();
});
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displaymovements(currentAccount, !sorted);
  sorted = !sorted;
});

// labelBalance.addEventListener("click", function () {
//   const movememtsUI = Array.from(
//     document.querySelectorAll(".movements__value"),
//     (el) => Number(el.textContent.replace("€", ""))
//   );
//   // console.log(movememtsUI);
// });
// to create array of an movements of current account

// use case of mod operator
// labelBalance.addEventListener("click", function () {
//   [...document.querySelectorAll(".movements__row")].forEach(function (curr, i) {
//     if (i % 2 === 0) curr.style.backgroundColor = "red";
//   });
// });
