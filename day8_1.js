const fs = require('fs');
const FILENAME = 'day8.input';

/**
 * reads the input
 * @return {string[]} the input data
 */
function readInput() {
  const inputFile = fs.readFileSync(FILENAME, {encoding: 'utf-8'});
  const inputData = [];
  for (let line of inputFile.split('\n')) {
    inputData.push(line);
  }
  return inputData;
}

/**
 * solves day 8 part 1
 * @param {string[]} lines as the input
 * @return {number} number of characters in all lines
 */
function solve(lines) {
  let countChars = 0;
  const alphaRegex = /[a-zA-Z]+/g;
  for (let line of lines) {
    let lineChars = 0;
    for (let i=1, j=line.length; i < j - 1; i++) {
      if (line[i].match(alphaRegex)) {
        lineChars++;
      } else if (line[i] == '\\') {
        if (line[i+1] == '"' || line[i+1] == '\\') {
          i++;
          lineChars++;
        } else if (line[i+1] == 'x') {
          i += 3;
          lineChars++;
        }
      }
    }
    countChars += line.length - lineChars;
    console.log(`${line}: length=${line.length},chars=${lineChars}`);
  }
  return countChars;
}
console.log(solve(readInput()));

console.log('Doner');
