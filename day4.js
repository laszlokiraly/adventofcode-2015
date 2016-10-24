var md5 = require('md5');

var input = 'bgvyzdsv';

var foundSolution = false;
var counter = 0;

while (!foundSolution) {
  var test = md5(input + counter);
  if (test.substring(0,6) === '000000') {
    foundSolution = true;
  } else {
    counter ++;
  }
}

console.log(counter);
