'use strict';
/*
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = 'Correct Number!';
console.log(document.querySelector('.message').textContent);

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/

/* Generating our random number. Truncate so there isn't a lot of numbers behind the decimal. */
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20; /* Can't be a const since we need it to not be immutable */
let highscore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

/* Adjusting the check button. When clicked, it outputs our guess into the log */
document.querySelector('.check').addEventListener('click', function () {
  /* Makes our "guess" a number instead of a string */
  const guess = Number(document.querySelector('.guess').value);

  console.log(
    /* Outputs data type (number) of our guess */
    guess,
    typeof guess
  );

  if (!guess) {
    // If no guess is given, then adjust the message
    //document.querySelector('.message').textContent = '⛔ No number!';
    displayMessage('⛔ No number!');
  } else if (guess === secretNumber) {
    // They guessed correctly.
    //document.querySelector('.message').textContent = '🥳 Correct Number!';
    displayMessage('🥳 Correct Number!');
    document.querySelector('.number').textContent = secretNumber;

    document.querySelector('body').style.backgroundColor = '#60b347';

    document.querySelector('.number').style.width = '30rem';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  } else if (guess !== secretNumber) {
    if (score > 0) {
      //document.querySelector('.message').textContent =
      //guess > secretNumber ? '📈 Too high!' : '📉 Too low!';
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
      score--; /* Same as saying score = score - 1; */
      document.querySelector('.score').textContent = score;
    } else {
      //document.querySelector('.message').textContent = '💥 You lost the game';
      displayMessage('💥 You lost the game');
      document.querySelector('.score').textContent = 0;
    }
  }
  //   } else if (guess > secretNumber) {
  //     // They guessed too high.
  //     if (score > 0) {
  //       document.querySelector('.message').textContent = '📈 Too high!';
  //       score--; /* Same as saying score = score - 1; */
  //       document.querySelector('.score').textContent = score;
  //     } else {
  //       document.querySelector('.message').textContent = '💥 You lost the game';
  //       document.querySelector('.score').textContent = 0;
  //     }
  //   } else if (guess < secretNumber) {
  //     // They guessed too low.
  //     if (score > 0) {
  //       document.querySelector('.message').textContent = '📉 Too low!';
  //       score--;
  //       document.querySelector('.score').textContent = score;
  //     } else {
  //       document.querySelector('.message').textContent = '💥 You lost the game';
  //       document.querySelector('.score').textContent = 0;
  //     }
  //   }
});

// When they click "Again!" button
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.number').textContent = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
