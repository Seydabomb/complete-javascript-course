'use strict';
/* New Code
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  //COUNTRY PROPERTIES
  const flag = data.flags.svg;
  const countryName = data.name.common;
  const region = data.region;
  const population = (data.population / 1000000).toFixed(2);
  const language = Object.values(data.languages)[0];
  const currency = Object.values(data.currencies)[0].name;

  //HTML
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${flag}" />
      <div class="country__data">
        <h3 class="country__name">${countryName}</h3>
        <h4 class="country__region">${region}</h4>
        <p class="country__row"><span>👫</span>${population} million people</p>
        <p class="country__row"><span>🗣️</span>${language}</p>
        <p class="country__row"><span>💰</span>${currency}</p>
      </div>
      </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};
*/

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

// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
//     // Also an asynchronous function so it returns another promise
//     return response.json();
//   });
// };

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
