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

/* ========================== Object.create (LEAST USED WAY) ========================== */
// const PersonProto = {
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   },

//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const steven = Object.create(PersonProto);
// console.log(steven); // outputs an empty object {}
// steven.name = 'Steven';
// steven.birthYear = 2002;
// steven.calcAge(); // outputs 35

// console.log(steven.__proto__ == PersonProto); // outputs true

// const sarah = Object.create(PersonProto);
// sarah.init('Sarah', 1979);
// sarah.calcAge(); // outputs 58

/* ========================== Coding Challenge #2 ========================== */
/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/
// class CarCl {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   accelerate() {
//     this.speed += 10;
//     console.log(`${this.make} is going at ${this.speed} km/h`);
//   }

//   brake() {
//     this.speed -= 5;
//     console.log(`${this.make} is going at ${this.speed} km/h`);
//   }

//   get speedUS() {
//     return this.speed / 1.6;
//   }

//   set speedUS(speed) {
//     this.speed = speed * 1.6;
//   }
// }

// const car1 = new CarCl('Ford', 120);
// console.log(car1); // outputs carCl {make: 'Ford', speed: 120}
// console.log(car1.speedUS); // outputs 75
// car1.accelerate(); // outputs Ford is going at 130 km/h
// car1.accelerate(); // Ford is going at 140 km/h
// car1.brake(); // Ford is going at 135 km/h

// car1.speedUS = 50;
// console.log(car1); // outputs carCl {make: 'Ford', speed: 80}
// car1.brake(); // outputs Ford is going at 75 km/h

/* ================ Inheritance Between "Classes": Constructor Functions =============== */
// const Person = function (firstName, birthYear) {
//   // Instance properties
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// const Student = function (firstName, birthYear, course) {
//   Person.call(this, firstName, birthYear); // .call() helps set "this"
//   this.course = course;
// };

// // Linking prototypes
// Student.prototype = Object.create(Person.prototype); // Now the Student.prototype inherits from Person.prototype. Have to do it here or else it would override Student.prototype.introduce()

// Student.prototype.introduce = function () {
//   console.log(`My name is ${this.firstName} and I study ${this.course}`);
// };

// const mike = new Student('Mike', 2020, 'Computer Science');
// console.log(mike);
// mike.introduce(); // My name is Mike and I study Computer Science
// mike.calcAge(); // 17

// console.log(mike.__proto__);
// console.log(mike.__proto__.__proto__);

// console.log(mike instanceof Student); // true
// console.log(mike instanceof Person); // true
// console.log(mike instanceof Object); // true

// Student.prototype.constructor = Student;
// console.dir(Student.prototype.constructor);

/* ========================== Coding Challenge #3 ========================== */
/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definition of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

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

// const EV = function (make, speed, charge) {
//   Car.call(this, make, speed); // .call() helps set "this"
//   this.charge = charge;
// };

// // Creates a new object with the prototype of Car.prototype
// EV.prototype = Object.create(Car.prototype); // We want the prototype property of EV to get inherited from the prototype property of Car

// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
// };

// // Overrides the accelerate function from the parent class
// EV.prototype.accelerate = function () {
//   this.speed += 20; // increases speed by 20
//   this.charge--; // decreases charge by 1%
//   console.log(
//     `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}`
//   );
// };

// const tesla = new EV('Tesla', 120, 23);
// tesla.chargeBattery(90);
// console.log(tesla); // EV {make: 'Tesla', speed: 120, charge: 90}

// tesla.accelerate(); // Tesla is going at 140 km/h, with a charge of 89
// tesla.brake(); // Tesla is going at 135
// tesla.brake(); // Tesla is going at 130
// tesla.accelerate(); // Tesla is going at 150 km/h, with a charge of 88

/* ================== Inheritance Between "Classes": ES6 Classes ===================== */
// // Class Declaration
// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   // Instance methods
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }

//   greet() {
//     console.log(`Hey ${this.fullName}`);
//   }

//   get age() {
//     return 2037 - this.birthYear;
//   }

//   set fullName(name) {
//     if (name.includes(' ')) this._fullName = name;
//     else alert(`${name} is not a full name!`);
//   }

//   get fullName() {
//     return this._fullName;
//   }

//   // Static method
//   static hey() {
//     console.log('Hey there 👋'); // this points to "PersonCl"
//   }
// }

// class StudentCl extends PersonCl {
//   constructor(fullName, birthYear, course) {
//     // Always needs to have super() happen first! super() is the constructor function of the parent class
//     super(fullName, birthYear);
//     this.course = course;
//   }

//   introduce() {
//     console.log(`My name is ${this.fullName} and I study ${this.course}`);
//   }

//   // Overrides parent's calcAge()
//   calcAge() {
//     console.log(
//       `I'm ${
//         2037 - this.birthYear
//       } years old, but as a student I feel more like ${
//         2037 - this.birthYear + 10
//       }`
//     );
//   }
// }

// const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
// martha.introduce();
// martha.calcAge();

/* ================== Inheritance Between "Classes": Object.create ===================== */
// // Parent Class
// const PersonProto = {
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   },

//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const steven = Object.create(PersonProto);

// // StudentProto inherits PersonProto prototype
// const StudentProto = Object.create(PersonProto);

// // Jay inherits from StudentProto which in turns inherits from PersonProto
// // Jay can use any of the methods in StudentProto and any of the methods in PersonProto
// // const jay = Object.create(StudentProto);
// StudentProto.init = function (firstName, birthYear, course) {
//   PersonProto.init.call(this, firstName, birthYear);
//   this.course = course;
// };

// StudentProto.introduce = function () {
//   console.log(`My name is ${this.firstName} and I study ${this.course}`);
// };

// const jay = Object.create(StudentProto);
// jay.init('Jay', 2010, 'Computer Science');
// jay.introduce(); // My name is Jay and I study Computer Science
// jay.calcAge(); // 27

/* ============== Inheritance Between "Classes": Another Class Example ================ */
// class Account {
//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;
//     this.pin = pin;
//     this.movements = [];
//     this.locale = navigator.language;

//     console.log(`Thanks for opening an account, ${owner}`);
//   }

//   // Public interface (API)
//   deposit(val) {
//     this.movements.push(val);
//   }

//   withdraw(val) {
//     this.deposit(-val);
//   }
//   approveLoan(val) {
//     return true;
//   }

//   requestLoan(val) {
//     if (this.approveLoan(val)) {
//       this.deposit(val);
//       console.log('Loan approved');
//     }
//   }
// }

// const acc1 = new Account('Jonas', 'EUR', 1111);

// // acc1.movements.push(250);
// // acc1.movements.push(-250);
// acc1.deposit(250);
// acc1.withdraw(140);

// // The public shouldn't get access to these methods so we need encapsulation
// acc1.requestLoan(1000);
// acc1.approveLoan(1000);

// console.log(acc1);
// console.log(acc1.pin);

/* ============== Encapsulation: Protected Properties and Methods ================ */
// class Account {
//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;

//     // Protected property
//     this._pin = pin;
//     this._movements = [];
//     this.locale = navigator.language;

//     console.log(`Thanks for opening an account, ${owner}`);
//   }

//   // Public interface (API)
//   getMovements() {
//     return this._movements;
//   }

//   deposit(val) {
//     this._movements.push(val);
//   }

//   withdraw(val) {
//     this.deposit(-val);
//   }
//   _approveLoan(val) {
//     return true;
//   }

//   requestLoan(val) {
//     if (this._approveLoan(val)) {
//       this.deposit(val);
//       console.log(`Loan approved`);
//     }
//   }
// }

// const acc1 = new Account('Jonas', 'EUR', 1111);

// // acc1._movements.push(250);
// // acc1._movements.push(-250);
// acc1.deposit(250);
// acc1.withdraw(140);
// acc1.requestLoan(1000);
// acc1.approveLoan(1000);
// console.log(acc1.getMovements());

// console.log(acc1);
// console.log(acc1.pin);

/* ============== Encapsulation: Private Class Fields and Methods ================ */
// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// (There is also the static version)

// class Account {
//   // 1) Public fields (instances)
//   locale = navigator.language;

//   // 2) Private fields
//   #movements = [];
//   #pin;

//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;

//     // Protected property
//     this.#pin = pin;
//     // this._movements = [];
//     // this.locale = navigator.language;

//     console.log(`Thanks for opening an account, ${owner}`);
//   }

//   // 3) Public methods

//   // Public interface (API)
//   getMovements() {
//     return this.#movements;
//   }

//   deposit(val) {
//     this.#movements.push(val);
//   }

//   withdraw(val) {
//     this.deposit(-val);
//   }

//   requestLoan(val) {
//     if (this.#approveLoan(val)) {
//       this.deposit(val);
//       console.log(`Loan approved`);
//     }
//   }

//   static helper() {
//     console.log('Helper');
//   }

//   // 4) Private methods
//   #approveLoan(val) {
//     return true;
//   }
// }

// const acc1 = new Account('Jonas', 'EUR', 1111);

// // acc1._movements.push(250);
// // acc1._movements.push(-250);
// // acc1.approveLoan(1000);

// acc1.deposit(250);
// acc1.withdraw(140);
// acc1.requestLoan(1000);

// console.log(acc1.getMovements());
// console.log(acc1);

// // console.log(acc1.#movements);
// // console.log(acc1.#pin);
// // acc1.#approveLoan(100);

// Account.helper();

/* ============================ Chaining Methods ============================== */
// class Account {
//   // 1) Public fields (instances)
//   locale = navigator.language;

//   // 2) Private fields
//   #movements = [];
//   #pin;

//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;

//     // Protected property
//     this.#pin = pin;
//     // this._movements = [];
//     // this.locale = navigator.language;

//     console.log(`Thanks for opening an account, ${owner}`);
//   }

//   // 3) Public methods

//   // Public interface (API)
//   getMovements() {
//     return this.#movements;
//   }

//   deposit(val) {
//     this.#movements.push(val);
//     return this;
//   }

//   withdraw(val) {
//     this.deposit(-val);
//     return this;
//   }

//   requestLoan(val) {
//     if (this.#approveLoan(val)) {
//       this.deposit(val);
//       console.log(`Loan approved`);
//       return this;
//     }
//   }

//   static helper() {
//     console.log('Helper');
//   }

//   // 4) Private methods
//   #approveLoan(val) {
//     return true;
//   }
// }

// const acc1 = new Account('Jonas', 'EUR', 1111);

// // acc1._movements.push(250);
// // acc1._movements.push(-250);
// // acc1.approveLoan(1000);

// acc1.deposit(250);
// acc1.withdraw(140);
// acc1.requestLoan(1000);

// console.log(acc1.getMovements());
// console.log(acc1);

// // console.log(acc1.#movements);
// // console.log(acc1.#pin);
// // acc1.#approveLoan(100);

// Account.helper();

// // We added "return this" to the methods
// acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000); // Output "Loan approved"
// console.log(acc1.getMovements()); // Output [250, -140, 1000, 300, 500, -35, 25000, -4000]

/* ========================== Coding Challenge #4 ========================== */
/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chaining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/
// class CarCl {
//   constructor(make, speed) {
//     // Instance properties
//     this.make = make;
//     this.speed = speed;
//   }

//   accelerate() {
//     this.speed += 10;
//     console.log(`${this.make} is now going at ${this.speed}`);
//     return this;
//   }
//   brake() {
//     this.speed -= 5;
//     console.log(`${this.make} is now going at ${this.speed}`);
//     return this;
//   }
//   get speedUS() {
//     return this.speed / 1.6;
//   }

//   set speedUS(speed) {
//     this.speed = speed * 1.6;
//   }
// }

// // We want the prototype property of EVCl to get inherited from the prototype property of CarCl
// class EVCl extends CarCl {
//   // Private field
//   #charge;

//   constructor(make, speed, charge) {
//     super(make, speed);
//     this.#charge = charge;
//   }

//   chargeBattery(chargeTo) {
//     this.#charge = chargeTo;
//     return this;
//   }

//   // Overrides the accelerate function from the parent class
//   accelerate() {
//     this.speed += 20; // increases speed by 20
//     this.#charge--; // decreases charge by 1%
//     console.log(
//       `${this.make} is going at ${this.speed} km/h, with a charge of ${
//         this.#charge
//       }`
//     );
//     return this;
//   }
// }

// const rivian = new EVCl('Rivian', 120, 23);
// console.log(rivian); // EV {make: 'rivian', speed: 120, charge: 23}
// rivian.chargeBattery(90).accelerate().brake().accelerate().brake();
// // Outputs:
// // EVCl {make: 'Rivian', speed: 120, #charge" 23}
// // Rivian is now going at 140 km/h, with a charge of 89
// // Rivian is now going at 135
// // Rivian is going at 155 km/h, with a charge of 88
// // Rivian is now going at 150

// console.log(rivian.speedUS); // outputs 93.75 mph
