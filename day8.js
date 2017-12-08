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
 * solves day 8 part 2
 * @param {string[]} lines as the input
 * @return {number[]} number of characters in all lines
 */
function solve(lines) {
  let countCharsPart1 = 0;
  let countCharsPart2 = 0;
  const alphaRegex = /[a-zA-Z]+/g;
  for (let line of lines) {
    if (line == '') {
      continue;
    }
    let lineChars = 0;
    let newLine = '"\\"';
    let newLineChars = 3;
    for (let i=1, j=line.length; i < j - 1; i++) {
      if (line[i].match(alphaRegex)) {
        lineChars++;
        newLine += line[i];
        newLineChars++;
      } else if (line[i] == '\\') {
        newLine += line[i] + line[i];
        newLineChars += 2;
        if (line[i+1] == '"' || line[i+1] == '\\') {
          newLine += line[i] + line[i+1];
          newLineChars += 2;
          i++;
          lineChars++;
        } else if (line[i+1] == 'x') {
          newLine += line[i+1] + line[i+2] + line[i+3];
          newLineChars += 3;
          i += 3;
          lineChars++;
        }
      }
    }
    newLine += '\\""';
    newLineChars += 3;
    countCharsPart1 += line.length - lineChars;
    countCharsPart2 += newLine.length - line.length;
    // console.log(`${line}: length=${line.length},chars=${lineChars}`);
    // console.log(`${newLine}: length=${newLine.length},chars=${newLineChars}`);
  }
  return [`part 1: ${countCharsPart1}`, `part 2: ${countCharsPart2}`];
}
console.log(solve(readInput()));

console.log('Doner');
