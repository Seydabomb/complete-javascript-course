'use strict';
/*=======Scoping in Practice===============*/

/*
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      // Creating NEW variable with same name as outer scope's variable
      const firstName = 'Steven';

      // Reasssigning outer scope's variable
      output = 'NEW OUTPUT!';

      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }
    // console.log(str);
    console.log(millenial);
    // console.log(add(2, 3));
    console.log(output);
  }
  printAge();

  return age;
}

const firstName = 'Jonas';
calcAge(1991);
// console.log(age);
// printAge();
*/
/*=======Hoisting and TDZ in Practice===============*/
/* 
// Variables
console.log(me);
// console.log(job);
// console.log(year);

var me = 'Jonas';
let job = 'teacher';
const year = 1991;

// Functions
console.log(addDecl(2, 3));
// console.log(addExpr(2, 3));
console.log(addArrow);
// console.log(addArrow(2, 3));

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;

// Example
console.log(numProducts);
if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  console.log('All products deleted!');
}

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x);
console.log(y === window.x);
console.log(z === window.x);
*/

/*=======The "this" keyword in Practice===============*/
/*
//console.log(this); // outputs window
const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  //console.log(this); // outputs undefined
};
calcAge(1991);

const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  //console.log(this); // outputs window (it is in the global scope (parent scope))
};
calcAgeArrow(1980);

const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(this); // outputs year: 1991, calcAge f. It points to jonas because it is the object calling this method (jonas.calcAge();)
    console.log(2037 - this.year); // outputs 46, as intended
  },
};
jonas.calcAge();

const matilda = {
  year: 2017,
};

matilda.calcAge = jonas.calcAge;
matilda.calcAge(); // console.log(this) points to matilda from the const jonas and matilda is the object that called the method, hence why it outputted 20 correctly.

const f = jonas.calcAge;
f(); // undefined because the console.log(2037 - undefined.year) is undefined. This is because the f function isn't attached to anything, it has no owner. Hence undefined.
*/

/*=======Regular Functions vs. Arrow Functions===============*/
// var firstName = 'Matilda';

// const jonas = {
//   // not a content block, it is an object literal. So all in the global object still.
//   year: 1991,
//   calcAge: function () {
//     //console.log(this);
//     console.log(2037 - this.year);

//     /* Solution 1
//     const self = this; // self or that
//     const isMillenial = function () {
//       console.log(self);
//       console.log(self.year >= 1981 && self.year <= 1996);
//       //console.log(this.year >= 1981 && this.year <= 1996);
//     };
//     isMillenial(); // in a regular function call, the this keyword is undefined. So same as being outside of the function.
//   },*/

//     // Solution 2
//     const isMillenial = () => {
//       console.log(this);
//       console.log(this.year >= 1981 && this.year <= 1996);
//     };
//     isMillenial(); // in a regular function call, the this keyword is undefined. So same as being outside of the function.
//   },

//   greet: () => {
//     console.log(this);
//     console.log(`Hey ${this.firstName}`);
//     /* greet: function () { Just using a simple function
//     // using a function works. Still get undefined but that is what you want.
//     console.log(this);
//     console.log(`Hey ${this.firstName}`);*/
//   },
// };

// jonas.greet(); // becomes "Hey undefined". Since the arrow function doesn't get its own this keyword, it just goes to the parent which is global and thusly, undefined. Now we defined it as Matilda, then it now has Matilda, "Hey Matilda".
// // Never use an arrow function as a method
// jonas.calcAge();

// Arguments Keyword
// const addExpr = function (a, b) {
//   console.log(arguments);
//   return a + b;
// };
// addExpr(2, 5);
// addExpr(2, 5, 8, 12);

// var addArrow = (a, b) => {
//   console.log(arguments); // arguments keyword doesn't work in an arrow function
//   return a + b;
// };
// addArrow(2, 5, 8);

/*=======Primitive vs Reference Types===============*/
// let age = 30;
// let oldAge = age;
// age = 31;
// console.log(age);
// console.log(oldAge);

// const me = {
//   name: 'Jonas',
//   age: 30,
// };

// const friend = me;
// friend.age = 27;
// console.log('Friend:', friend);
// console.log('Me', me);

/*=======Primitive vs Objects in Practice===============*/
// Primitive Types
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName); // outputs Davis Williams

// Reference Types
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

const marriedJessica = jessica; // not a new object in the heap so it will overwrite jessica too.
marriedJessica.lastName = 'Davis';
console.log('Before marriage:', jessica);
console.log('After marriage:', marriedJessica);

// marriedJessica = {}; won't work

// Copying objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

const jessicaCopy = Object.assign({}, jessica2); // merges empty place with jessica2, so now we have a new object to manipulate that won't override the original jessica2.
jessicaCopy.lastName = 'Davis';
console.log('Before marriage:', jessica2);
console.log('After marriage:', jessicaCopy);

jessicaCopy.family.push('Mary'); // Because of the shallow clone, changing the family object adjusted both jessica2 and jessicaCopy. Pushing to the same object in the memory heap.
jessicaCopy.family.push('John');
console.log('Before marriage:', jessica2);
console.log('After marriage:', jessicaCopy);
