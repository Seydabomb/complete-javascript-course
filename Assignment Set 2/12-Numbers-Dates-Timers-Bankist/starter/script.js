'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/*======================= BANKIST APP =========================*/

/////////////////////////////////////////////////
/*======================= DATA =========================*/

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
/*======================= ELEMENTS =========================*/
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/*======================= FUNCTIONS =========================*/

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
/*======================= EVENT HANDLERS =========================*/
let currentAccount;

// FAKE ALWAYS LOGGED IN
currentAccount = account1;
updateUI.currentAccount;
containerApp.style.opacity = 100;

const now = new Date();
const day = `${now.getDate()}`.padStart(2, 0);
const month = `${now.getMonth() + 1}`.padStart(2, 0);
const year = now.getFullYear();
const hour = `${now.getHours().padStart(2, 0)}`;
const min = `${now.getMinutes().padStart(2, 0)}`;
labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

// day/month/year

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and time
    const date = new Date(acc.movementsDates[i]);
    const day = `${now.getDate()}`.padStart(2, 0);
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const year = now.getFullYear();
    const displayDate = `${day}/${month}/${year}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date()).toISOString();
    receiverAcc.movementsDates.push(new Date()).toISOString();

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Add loan date
    currentAccount.movementsDates.push(new Date()).toISOString();

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/*======================= LECTURES =========================*/

/*======================= Converting and Checking Numbers =========================*/

// console.log(23 === 23.0);
// // Base 10 - 0-9
// // Binary Base 2 - 0 1

// // ERRORS with JS
// console.log(0.1 + 0.2); // 0.300000000000004
// console.log(0.1 + 0.2 === 0.3); // false

// // Conversion
// console.log(Number('23'));
// console.log(+'23');

// // Parsing
// console.log(Number.parseInt('30px', 10)); // outputs the number 30, passing '10' means base 10
// console.log(Number.parseInt('e23', 10)); // outputs NaN since number wasn't first in the string

// console.log(Number.parseInt('2.5rem')); // outputs 2, whitespace doesn't impact at all
// console.log(Number.parseFloat('2.5rem')); // outputs 2.5, whitespace doesn't impact at all

// // Check if value is NaN
// console.log(Number.isNaN(20)); // outputs false
// console.log(Number.isNaN('20')); // outputs false
// console.log(Number.isNaN(+'20X')); // outputs true (it isn't a number)
// console.log(Number.isNaN(23 / 0)); // outputs false (infinity is not NaN)

// // Checking if value is a number
// console.log(Number.isFinite(20)); // True. It is finite
// console.log(Number.isFinite('20')); // False. It isn't finite (It's NaN).
// console.log(Number.isFinite(+'20X')); // False. It isn't finite (It's NaN).
// console.log(Number.isFinite(23 / 0)); // False. It isn't finite (It's NaN).

// console.log(Number.isInteger(23)); // true
// console.log(Number.isInteger(23.0)); // true
// console.log(Number.isInteger(23 / 0)); // false

/*======================= Math and Rounding =========================*/
// console.log(Math.sqrt(25));
// console.log(25 ** (1 / 2));
// console.log(8 ** (1 / 3));

// console.log(Math.max(5, 18, 23, 11, 2)); // outputs 23
// console.log(Math.max(5, 18, '23', 11, 2)); // outputs 23
// console.log(Math.max(5, 18, '23px', 11, 2)); // outputs NaN

// console.log(Math.min(5, 18, 23, 11, 2)); // outputs 2

// console.log(Math.PI * Number.parseFloat('10px') ** 2); // area of a circle

// console.log(Math.trunc(Math.random() * 6) + 1); // outputs values between 1 and 6

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min) + 1) + min; // outputs values between 0 and 1 initially
// // but we made it so it does numbers between 0 and (max-min) and even further that means numbers between min and (max - min + min)
// // which is numbers between min and max
// // console.log(randomInt(10, 20));

// // Rounding Integers
// console.log(Math.round(23.3)); // outputs 23
// console.log(Math.round(23.9)); // outputs 24

// console.log(Math.ceil(23.3)); // outputs 24
// console.log(Math.ceil(23.9)); // outputs 24

// console.log(Math.floor(23.3)); // outputs 23
// console.log(Math.floor('23.9')); // outputs 23

// console.log(Math.trunc(23.3)); // outputs 23

// console.log(Math.trunc(-23.3)); // outputs -23
// console.log(Math.floor(-23.3)); // outputs -24

// // Rounding decimals
// console.log((2.7).toFixed(0)); // outputs '3' so a string
// console.log((2.7).toFixed(3)); // outputs '2.700' so a string
// console.log((2.345).toFixed(2)); // outputs '2.35' so a string
// console.log(+(2.345).toFixed(2)); // outputs 2.35 as a number

/*======================= The Remainder Operator =========================*/
// console.log(5 % 2); // outputs 1
// // because 5/2 = 2 remainder (5-4) which is 1 ( 5= 2*2 + 1)
// console.log(8 % 3); // outputs 2
// // because 8/3 = 2 remainder (8-6) which is 2 ( 8= 3*2 + 2)

// console.log(6 % 2); // outputs 0

// const isEven = n => n % 2 === 0;
// console.log(isEven(8)); // outputs true
// console.log(isEven(23)); // outputs false
// console.log(isEven(514)); // outputs true

// labelBalance.addEventListener('click', function () {
//   [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
//     // 0,2,4,6,...
//     if (i % 2 === 0) row.style.backgroundColor = 'orangered';
//     // 0,3,6,9,....
//     if (i % 3 === 0) row.style.backgroundColor = 'blue';
//   });
// });

/*======================= Numeric separators =========================*/
// const diameter = 287_460_000_000;
// console.log(diameter); // outputs 287460000000

// const price = 345_99;
// console.log(price); // outputs 34599

// const transferFee1 = 15_00;
// const transferFee2 = 1_500; // both output 15000

// console.log(Number('230_000')); // outputs NaN
// console.log(parseInt('230_000')); // outputs 230

/*======================= BigInt =========================*/
// console.log(2 ** 53 - 1);
// console.log(Number.MAX_SAFE_INTEGER); // both output the same number

// console.log(2 ** 53 + 1); // doesn't accurately represent the number

// console.log(835734853985739854793845793845793845793845784n); // shows the entire number
// console.log(BigInt(8357348539857)); // same thing

// // Operations
// console.log(10000n + 10000n); // outputs 20000n
// console.log(920384902384092843092n + 10000000000n);
// console.log(Math.sqrt(16n)); // error message

// const huge = 2094823984279384298383292n;
// const num = 23;
// // console.log(huge * num); // error, can't mix bigint and other number
// console.log(huge * BigInt(num)); // works

// // Exceptions
// console.log(20n > 15); // outputs true
// console.log(20n === 20); // outputs false
// console.log(typeof 20n); // outputs bigint
// console.log(20n == '20'); // outputs true

// console.log(huge + ' is REALLY big!!!');

// // Divisions
// console.log(10n / 3n); // outputs 3n

/*======================= Creating Dates =========================*/
// // Create a date
// const now = new Date();
// console.log(now); // outputs Mon Aug 12 2024 11:19:23 GMT-0600 (Mountain Daylight Time)

// console.log(new Date('Aug 12 2024 11:19:06')); // outputs Mon Aug 12 2024 11:19:23 GMT-0600 (Mountain Daylight Time)
// console.log(new Date('December 24, 2015')); // outputs Thu Dec 24 2015 00:00:00 GMT-0700 (Mountain Standard Time)
// console.log(new Date(account1.movementsDates[0]));

// console.log(new Date(2037, 10, 19, 15, 23, 5)); // outputs Thu Nov 19 2037 15:23:05 GMT-0700 (Mountain Standard Time)
// console.log(new Date(2037, 10, 33)); // outputs (3 days past november so December 3rd) Thu Dec 03 2037 00:00:00 GMT-0700 (Mountain Standard Time)

// console.log(new Date(0)); // outputs Wed Dec 31 1969 17:00:00 GMT-0700 (Mountain Standard Time)
// console.log(new Date(3 * 24 * 60 * 60 * 1000)); // outputs (exactly 3 days later) Sat Jan 03 1970 17:00:00 GMT-0700 (Mountain Standard Time)

// // Working with dates
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future); // outputs Thu Nov 19 2037 15:23:00 GMT-0700 (Mountain Standard Time)
// console.log(future.getFullYear()); // outputs 2037
// console.log(future.getMonth()); // outputs 10
// console.log(future.getDate()); // outputs 19
// console.log(future.getDay()); // outputs 4 (Thursday)
// console.log(future.getHours()); // outputs 15
// console.log(future.getMinutes()); // outputs 23
// console.log(future.getSeconds()); // outputs 0
// console.log(future.toISOString()); // 2037-11-19T22:23:00.000Z
// console.log(future.getTime()); // outputs 2142282180000

// console.log(new Date(2142282180000)); // outputs Thu Nov 19 2037 15:23:00 GMT-0700 (Mountain Standard Time)

// console.log(Date.now()); // 1723483803376 (the current date)

// future.setFullYear(2040);
// console.log(future); // Mon Nov 19 2040 15:23:00 GMT-0700 (Mountain Standard Time)

/*======================= Operations With Dates =========================*/
