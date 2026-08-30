const pdf = require('pdf-parse');
console.log(typeof pdf);
if (typeof pdf === 'function') {
  console.log('It is a function!');
} else {
  console.log('It is an object. Keys:', Object.keys(pdf));
}
