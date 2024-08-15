'use strict';
/* ================= Constructor Functions and the New Operator =================== */

/* How all of this works: */
// 1. "new" {} empty object is created
// 2. Function is called, "this" = {} empty object. In this case "this" is "Person"
// 3. {} linked to prototype
// 4. Function automatically returns {}

// // Constructor Function (Usually starts with capital letter)
// const Person = function (firstName, birthYear) {
//   //console.log(this); // outputs Person {}

//   // Instance properties
//   this.firstName = firstName;
//   this.birthYear = birthYear;

//   // Never create a method in a constructor function (makes a million copies of the Person function attached to every object)
//   this.calcAge = function() {
//     console.log(2037 - this.birthYear);
//   }
// };

// // first object
// const jonas = new Person('Jonas', 1991);
// console.log(jonas);

// // second object
// const matilda = new Person('Matilda', 2017);
// // third object
// const jack = new Person('Jack', 1975);
// console.log(matilda, jack);

// console.log(jonas instanceof Person); // outputs true

/* ============================ Prototypes ============================ */
// console.log(Person.prototype); // Person.prototype is not a prototype of person, it is a prototype of objects created by Person.

// // Adding a method to a prototype. Doesn't attach to any object. Only 1 copy of the function
// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear); // "this" keyword points to the object, so jonas or matilda or something
// };

// jonas.calcAge(); // Object calling the method. outputs 46
// matilda.calcAge(); // Object calling the method. outputs 20

// console.log(jonas.__proto__); // outputs calcAge: f {} and constructor: f, hence why jonas can use the method.

// // The prototype of the jonas object is basically the prototype property of the constructor function
// console.log(jonas.__proto__ === Person.prototype); // outputs true
// console.log(Person.prototype.isPrototypeOf(jonas)); // Same thing
// console.log(Person.prototype.isPrototypeOf(Person)); // outputs false
// // so think of prototype property as .prototypeOfLinkedObjects property

// Person.prototype.species = 'Homo Sapiens';
// console.log(jonas.species, matilda.species); // outputs Homo Sapiens Homo Sapiens

// console.log(jonas.hasOwnProperty('firstName')); // true
// console.log(jonas.hasOwnProperty('species')); // false. This property isn't in the Jonas object, just able to access since it is linked to person.

// console.log(jonas.__proto__); // Home Sapiens and calcAge content
// // Object.prototype (top of prototype chain)
// console.log(jonas.__proto__.__proto__); // the bigger functions
// console.log(jonas.__proto__.__proto__.__proto__); // null then undefined

// console.dir(Person.prototype.constructor); // outputs Person(firstName, birthYear)

// const arr = [3, 6, 6, 5, 6, 9, 9];
// console.log(arr.__proto__); // you see map(), join(), keys(), etc. The array inherits these methods from its prototype. You'll see the map() resides in the Array constructor.

// console.log(arr.__proto__ === Array.prototype); // outputs true

// Array.prototype.unique = function () {
//   return [...new Set(this)]; // We create a new method of the prototype property for the Array constructor. So all Arrays now have this method.
// };

// console.log(arr.unique()); // outputs [3,6,5,9]

// const h1 = document.querySelector('h1');
// console.dir(x => x + 1);

/* ========================== Coding Challenge #1 ========================== */
/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/
// const Car = function (make, speed) {
//   // Instance properties
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} is now going at ${this.speed}`);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} is now going at ${this.speed}`);
// };

// const car1 = new Car('BMW', 120);
// const car2 = new Car('Mercedes', 95);

// console.log(car1);
// car1.accelerate();
// car1.brake();
// car1.brake();
// car1.accelerate();

/* ========================== ES6 Classes ========================== */
// // Class Expression
// // const PersonCL = class {};

// // Class Declaration
// class PersonCl {
//   constructor(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   }

//   // Methods will be added to .prototype property
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }

//   greet() {
//     console.log(`Hey ${this.firstName}`);
//   }

//   get age() {
//     return 2037 - this.birthYear;
//   }

//   set fullName(name) {
//     console.log(name);
//     if (name.includes(' ')) this.fullName = name;
//     else alert(`${name} is not a full name!`);
//   }

//   get fullName() {
//     return this.fullName;
//   }

//   // Static method
//   static hey() {
//     console.log('Hey there👋');
//     console.log(this); // this points to "Person"
//   }
// }

// const jessica = new PersonCl('Jessica Davis', 1996);
// console.log(jessica);
// jessica.calcAge(); // 41
// console.log(jessica.age);

// console.log(jessica.__proto__ === PersonCl.prototype); // true

// // PersonCl.prototype.greet = function () {
// //   console.log(`Hey ${this.firstName}`);
// // };

// jessica.greet();

// // PersonCl.hey();

// // 1. Classes are NOT hoisted (meaning we can't use them before they are declared)
// // 2. Classes are first-class citizens (meaning can pass into functions and return them from functions)
// // 3. Classes are executed in strict mode

/* ========================== Setters and Getters ========================== */
// const walter = new PersonCl('Walter White', 1965);

// const account = {
//   owner: 'Jonas',
//   movements: [200, 530, 120, 300],

//   get latest() {
//     return this.movements.slice(-1).pop();
//   },

//   set latest(mov) {
//     this.movements.push(mov);
//   },
// };

// console.log(account.latest); // 300

// account.latest = 50;
// console.log(account.movements); // [200, 530, 120, 300, 50]

/* ========================== Static Methods ========================== */

// // Constructor Function (Usually starts with capital letter)
// const Person = function (firstName, birthYear) {
//   //console.log(this); // outputs Person {}

//   // Instance properties
//   this.firstName = firstName;
//   this.birthYear = birthYear;

//   // Never create a method in a constructor function (makes a million copies of the Person function attached to every object)
//   this.calcAge = function () {
//     console.log(2037 - this.birthYear);
//   };
// };

// // first object
// const jonas = new Person('Jonas', 1991);
// console.log(jonas);

// // second object
// const matilda = new Person('Matilda', 2017);
// // third object
// const jack = new Person('Jack', 1975);
// console.log(matilda, jack);

// console.log(jonas instanceof Person); // outputs true

// Person.hey = function () {
//   console.log('Hey there👋');
//   console.log(this); // this points to "Person"
// };

// Person.hey();
// // jonas.hey(); // Isn't in the prototype of the jonas object so it isn't inherited.
