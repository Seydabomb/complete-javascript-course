'use strict';
// const btn = document.querySelector('.btn-country');
// const countriesContainer = document.querySelector('.countries');

// const renderCountry = function (data, className = '') {
//   //COUNTRY PROPERTIES
//   const flag = data.flags.svg;
//   const countryName = data.name.common;
//   const region = data.region;
//   const population = (data.population / 1000000).toFixed(2);
//   const language = Object.values(data.languages)[0];
//   const currency = Object.values(data.currencies)[0].name;

//   //HTML
//   const html = `
//     <article class="country ${className}">
//       <img class="country__img" src="${flag}" />
//       <div class="country__data">
//         <h3 class="country__name">${countryName}</h3>
//         <h4 class="country__region">${region}</h4>
//         <p class="country__row"><span>👫</span>${population} million people</p>
//         <p class="country__row"><span>🗣️</span>${language}</p>
//         <p class="country__row"><span>💰</span>${currency}</p>
//       </div>
//       </article>`;

//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };

// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText('beforeend', msg);
//   countriesContainer.style.opacity = 1;
// };

// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
//     // Also an asynchronous function so it returns another promise
//     return response.json();
//   });
// };
// const getCountryAndNeighbor = function (country) {
//   // AJAX call 1 for main country:
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     // NOTE:responseText is actually string in JSON format.Converting js object:
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     // Render main country:
//     renderCountry(data);

//     // Get neighbor:
//     const neighbor = data.borders;
//     if (!neighbor) return;

//     // AJAX call 2 for neighbor:
//     neighbor.forEach(neighbor => {
//       let request2 = new XMLHttpRequest();
//       request2.open(
//         'GET',
//         `https://restcountries.com/v3.1/alpha/${neighbor}
//         `
//       );
//       request2.send();

//       request2.addEventListener('load', function () {
//         const [data2] = JSON.parse(this.responseText);
//         console.log(data2);

//         // Render neighbor country:
//         renderCountry(data2, 'neighbor');
//       });
//     });
//   });
// };

// getCountryAndNeighbor('portugal');
// getCountryAndNeighbor('usa');

// Promise stored in request variable
// const request = fetch('https://restcountries.com/v3.1/name/portugal');
// console.log(request);

// const getCountryData = function (country) {
//   // Once promise is fulfilled, the then() method does the next task
//   fetch(`https://restcountries.com/v3.1/name/${country}`).then(function (
//     response
//   ) {
//     console.log(response);

//     // Also an asynchronous function so it returns another promise
//     return response.json().then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
//   });
// };

/* ========== Chaining Promises & Finding Errors =========== */

/* OLD CODE
// const getCountryData = function (country) {
//   // Country 1

//   // Once promise is fulfilled, the then() method does the next task
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       // Also an asynchronous function so it returns another promise
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbor = data[0].borders[0];
//       const neighbor = 'dfsdfef';

//       if (!neighbor) return;

//       // Country 2
//       return (
//         fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`)
//           .then(response => {
//             console.log(response);

//             if (!response.ok)
//               throw new Error(`Country not found (${response.status})`);
//             // Also an asynchronous function so it returns another promise
//             return response.json();
//           })
//           .then(data => renderCountry(data[0], 'neighbor'))

//           // Catches any errors that happen at any point in the chain
//           .catch(err => {
//             console.log(`${err} 💥💥💥`);
//             renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//           })
//           .finally(() => {
//             countriesContainer.style.opacity = 1;
//           })
//       );
//     });
// };
*/
// const getCountryData = function (country) {
//   // Country 1
//   getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbor = data[0].borders[0];
//       const neighbor = 'dfsdfef';

//       if (!neighbor) throw new Error('No neighbor found!');

//       // Country 2
//       return getJSON(
//         `https://restcountries.com/v3.1/alpha/${neighbor}`,
//         'Country not found'
//       );
//     })
//     .then(data => renderCountry(data[0], 'neighbor'))

//     // Catches any errors that happen at any point in the chain
//     .catch(err => {
//       console.log(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });

// getCountryData('australia');

/* ===================== Coding Challenge #1 ==================== */
/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you received about the provided location. Then, using this data, log a message like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 3: -33.933, 18.474

GOOD LUCK 😀
*/

// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);
//       // Also an asynchronous function so it returns another promise
//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message} 💥`));
// };
// whereAmI(52.508, 13.381); // You are in Mumbai, India
// whereAmI(19.037, 72.873); // You are in Berlin, Germany
// whereAmI(-33.933, 18.474); // You are in Cape Town, South Africa

/* =========== The Event Loop in practice ========== */
/* First Part
// console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// console.log('Test end');

// // Test start
// // Test end
// // Resolved promise 1
// // 0 sec timer
*/

/* Second Part
console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 10000000; i++) {}
  console.log(res);
});
console.log('Test end');

// Test start
// Test end
// Resolved promise 1
// Resolved Promise 2
// 0 sec timer
*/

/* =========== Building a Simple Promise ========== */
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening 🔮');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN 🤑');
//     } else {
//       reject(new Error('You lost your money! 💩'));
//     }
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// // Promisifying setTimeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// // A nice sequence of asynchronous behavior
// wait(1)
//   .then(() => {
//     console.log('1 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('2 seconds passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('3 seconds passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('4 seconds passed');
//     return wait(1);
//   });

// // // Better than this
// // setTimeout(() => {
// //   console.log('1 second passed');
// //   setTimeout(() => {
// //     console.log('2 seconds passed');
// //     setTimeout(() => {
// //       console.log('3 second passed');
// //       setTimeout(() => {
// //         console.log('4 second passed');
// //       }, 1000);
// //     }, 1000);
// //   }, 1000);
// // }, 1000);

// // Instantaneously
// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('Problem')).catch(x => console.error(x));

/* =========== Promisifying the Geolocation API ========== */

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position), // resolves the promise when success
//     //   err => reject(err) // rejects the promise when not successful
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// // getPosition().then(pos => console.log(pos));

// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;
//       return fetch(
//         `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
//       );
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(
//         `You are in ${data.principalSubdivision}, ${data.countryName}`
//       );

//       return fetch(`https://restcountries.com/v3.1/name/USA`); //  ${data.countryCode} only pulls "US", needs USA
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);
//       // Also an asynchronous function so it returns another promise
//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message} 💥`))
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

// btn.addEventListener('click', whereAmI());

/* =========================== Coding Challenge #2 =============================== */
/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Consume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const imgContainer = document.querySelector('.images');

// // 1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.
// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error('Image not found'));
//     });
//   });
// };

// // 4. the global variable needed
// let currentImg;

// // 2. Consume the promise using .then and also add an error handler;
// createImage('img/img-1.jpg')
//   .then(img => {
//     // 4. Assigning the global variable to img
//     currentImg = img;
//     console.log('Image 1 loaded');
//     // 3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
//     return wait(2);
//   })
//   .then(() => {
//     // 4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(() => {
//     currentImg = img;
//     console.log('Image 2 loaded');
//     // 5. After the second image has loaded, pause execution for 2 seconds again
//     return wait(2);
//   })
//   .then(() => {
//     // 6. After the 2 seconds have passed, hide the current image.
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

/* ======================== Consuming Promises with Async/Await ======================= */
// Rewriting all the code to prevent breaking.
// Using a different api so that we aren't trying to pull from an api that is no longer free.
// Can't directly pull code and plug into url for `https://restcountries.com/v2/name/${dataGeo.countryName}, have to adjust with an if statement to add the necessary letters.

// const btn = document.querySelector('.btn-country');
// const countriesContainer = document.querySelector('.countries');

// // Render country

// // Destructure to get the object
// const renderCountry = function (data, className = '') {
//   const html = `
//     <article class="country ${className}">
//             <img class="country__img" src="${data.flag}" />
//             <div class="country__data">
//               <h3 class="country__name">${data.name}</h3>
//               <h4 class="country__region">${data.region}</h4>
//               <p class="country__row"><span>👫</span>${(
//                 +data.population / 1000000
//               ).toFixed(1)} million people</p>
//               <p class="country__row"><span>🗣️</span>${
//                 data.languages[0].name
//               }</p>
//               <p class="country__row"><span>💰</span>${
//                 data.currencies[0].name
//               }</p>
//             </div>
//           </article>
//       `;

//   // Insert HTML
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };

// // Our Promise:
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// // Contains reverse geolocation:
// const whereAmI = async function () {
//   // Consuming the promise:

//   // Geolocation:
//   const pos = await getPosition();
//   const { latitude: lat, longitude: lng } = pos.coords;

//   // Reverse geocoding:

//   const resGeo = await fetch(
//     `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
//   );

//   const dataGeo = await resGeo.json();
//   console.log(dataGeo);
//   // Country data

//   // Check if countryName is "US" and change it to "USA"
//   let countryCode = dataGeo.countryCode;
//   if (countryCode === 'US') {
//     countryCode = 'USA';
//   }
//   console.log(countryCode);

//   const res = await fetch(`https://restcountries.com/v2/name/${countryCode}`);
//   const data = await res.json(); // Returns a new promise
//   console.log(data);
//   renderCountry(data[0]);
// };

// whereAmI();
// console.log('FIRST'); // outputs FIRST

/* ======================== Error Handling With Try... catch ======================= */
// const btn = document.querySelector('.btn-country');
// const countriesContainer = document.querySelector('.countries');

// // Render country

// // Destructure to get the object
// const renderCountry = function (data, className = '') {
//   const html = `
//     <article class="country ${className}">
//             <img class="country__img" src="${data.flag}" />
//             <div class="country__data">
//               <h3 class="country__name">${data.name}</h3>
//               <h4 class="country__region">${data.region}</h4>
//               <p class="country__row"><span>👫</span>${(
//                 +data.population / 1000000
//               ).toFixed(1)} million people</p>
//               <p class="country__row"><span>🗣️</span>${
//                 data.languages[0].name
//               }</p>
//               <p class="country__row"><span>💰</span>${
//                 data.currencies[0].name
//               }</p>
//             </div>
//           </article>
//       `;

//   // Insert HTML
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };

// // Our Promise:
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// // Contains reverse geolocation:
// const whereAmI = async function () {
//   // Consuming the promise:

//   try {
//     // Geolocation:
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;

//     // Reverse geocoding:

//     const resGeo = await fetch(
//       `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
//     );
//     if (!resGeo.ok) throw new Error('problem getting location data');

//     const dataGeo = await resGeo.json();

//     // Country data

//     // Check if countryName is "US" and change it to "USA"
//     let countryCode = dataGeo.countryCode;
//     if (countryCode === 'US') {
//       countryCode = 'USA';
//     }

//     const res = await fetch(`https://restcountries.com/v2/name/${countryCode}`);
//     if (!res.ok) throw new Error('Problem getting country');

//     const data = await res.json(); // Returns a new promise
//     renderCountry(data[0]);

//     return `You are in ${dataGeo.city}, ${dataGeo.countryName}`;
//   } catch (err) {
//     console.error(`${err} 💥`);
//     renderError(`💥 ${err.message}`);

//     // Reject promise returned from async function
//     throw err;
//   }
// };

// // const city = whereAmI(); // Returns a promise
// // console.log(city);

// // console.log('1: Will get location');
// // whereAmI()
// //   .then(city => console.log(`2: ${city}`))
// //   .catch(err => console.error(`2: ${err.message} 💥`))
// //   .finally(() => console.log(`3: Finished getting location`));

// // Now going to convert this into async/await

// console.log('1: Will get location');

// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`2: ${city}`);
//   } catch (err) {
//     console.error(`2: ${err.message} 💥`);
//   }
//   console.log(`3: Finished getting location`);
// })();

/* ======================== Running Promises in Parallel ======================= */

// ----- Running in Sequence
// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
//     // Also an asynchronous function so it returns another promise
//     return response.json();
//   });
// };

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
//     const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
//     const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);

//     console.log(data1.capital, data2.capital, data3.capital);
//   } catch (err) {
//     console.error(err);
//   }
// };

// get3Countries('portugal', 'canada', 'tanzania');

// ------ Running in Parallel (They don't rely on each other so want them to run at the same time)
// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
//     // Also an asynchronous function so it returns another promise
//     return response.json();
//   });
// };

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v3.1/name/${c1}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c2}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c3}`),
//     ]);

//     console.log(data.flatMap(d => d[0].capital));
//   } catch (err) {
//     console.error(err);
//   }
// };

// get3Countries('portugal', 'canada', 'tanzania');

/* ============== Other Promise Combinators: race, allSettled, and any ============= */

const sec = 2;

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

// Promise.race
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/italy`),
    getJSON(`https://restcountries.com/v3.1/name/egypt`),
    getJSON(`https://restcountries.com/v3.1/name/mexico`),
  ]);
  console.log(res[0].name);
})();

const timeout = function (s) {
  return new Promise(function (_) {
    setTimeout(function () {
      PromiseRejectionEvent(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/italy`),
  timeout(0.15),
])
  .then(res => console.log(res[0].name))
  .catch(err => console.error(err));
