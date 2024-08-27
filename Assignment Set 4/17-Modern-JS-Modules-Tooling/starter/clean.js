'strict mode';

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
}); // Now spendingLimits is immutable. No more new properties can be added to it.
// spendingLimits.jay = 200;
console.log(spendingLimits);

// const limit = spendingLimits[user] ? spendingLimits[user] : 0;
const getLimit = (limits, user) => limits?.[user] ?? 0; // if the property 'user' exists then add it, if not, then it is set to 0.

// Now a Pure Function (doesn't produce any side effects)
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  const cleanUser = user.toLowerCase();

  // return an array with an additional object instead of manipulating the original
  // creates a copy of the state array, then add a new element
  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }] // if true, does this
    : state; // if not, returns original state
};

const newBudget1 = addExpense(budget, spendingLimits, 10000, 'Pizza 🍕');

const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);

const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');
// console.log(newBudget1);
// console.log(newBudget2);

// const checkExpenses2 = function (state, limits) {
//   // Creates a brand new array using map, then ...entry copies each entry and appends the property flag: 'limit'
//   return state.map(entry => {
//     return entry.value < -getLimit(limits, entry.user)
//       ? { ...entry, flag: 'limit' }
//       : entry;
//   });
//   // for (const entry of newBudget3)
//   //   if (entry.value < -getLimit(limits, entry.user)) entry.flag = 'limit';
// };

// Now a pure function
const checkExpenses = (state, limits) =>
  state.map(entry =>
    entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry
  );

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

// Impure Function since it does the console.log()
const logBigExpenses = function (state, bigLimit) {
  // filtering so we only get the 2 biggest entries, then creating a new array with only the 2 emojis
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');
  // .reduce(
  //   (str, currentValue) =>
  //     `${str} /  ${(currentValue.description.slice(-2), '')}`
  // );

  console.log(bigExpenses);

  // let output = '';
  // for (const entry of budget)
  //   output +=
  //     entry.value <= -bigLimit ? `${entry.description.slice(-2)}  / ` : ''; // Emojis are 2 chars long
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);
};

logBigExpenses(finalBudget, 500); //  Logs all of the expenses bigger than 500
