const fs = require('fs');
const input = fs.readFileSync('day7.input', {encoding: 'utf-8'});

const assignmentRegex = /^([0-9]+|[a-z]+) -> ([a-z]+)$/g;
const andRegex = /^([0-9]+|[a-z]+) (?:AND) ([a-z]+) -> ([a-z]+)$/g;
const orRegex = /^([a-z]+) (?:OR) ([a-z]+) -> ([a-z]+)$/g;
const rshiftRegex = /^([a-z]+) (?:RSHIFT) ([0-9]+) -> ([a-z]+)$/g;
const lshiftRegex = /^([a-z]+) (?:LSHIFT) ([0-9]+) -> ([a-z]+)$/g;
const notRegex = /^(?:NOT) ([a-z]+) -> ([a-z]+)$/g;

const memory = new Map();

/**
 * reads the input
 */
function readInput() {
  memory = new Map();
  for (let line of input.split('\n')) {
    if (line != '') {
      let variableRegex = new RegExp(/^.* -> ([a-z]+)$/g);
      memory.set(variableRegex.exec(line)[1], line);
    }
  }
}
readInput();

constgoal = 'a';
/**
 * @param {string} variable name
 * @return {string} the assignment
 */
function calcValue(variable) {
  let line = memory.get(variable);
  if (line.match(assignmentRegex)) {
    let regexp = new RegExp(assignmentRegex);
    let matches = regexp.exec(line);
    if (isNaN(matches[1])) {
      let value = calcValue(matches[1]);
      memory.set(variable, `${value} -> ${variable}`);
      return value;
    } else {
      return matches[1];
    }
  } else if (line.match(andRegex)) {
    let regexp = new RegExp(andRegex);
    let matches = regexp.exec(line);
    if (isNaN(matches[1])) {
      let value = calcValue(matches[1]) & calcValue(matches[2]);
      memory.set(variable, `${value} -> ${variable}`);
      return value;
    } else {
      let value = matches[1] & calcValue(matches[2]);
      memory.set(variable, `${value} -> ${variable}`);
      return value;
    }
  } else if (line.match(orRegex)) {
    let regexp = new RegExp(orRegex);
    let matches = regexp.exec(line);
    if (isNaN(matches[1])) {
      let value = calcValue(matches[1]) | calcValue(matches[2]);
      memory.set(variable, `${value} -> ${variable}`);
      return value;
    } else {
      let value = matches[1] | calcValue(matches[2]);
      memory.set(variable, `${value} -> ${variable}`);
      return value;
    }
  } else if (line.match(notRegex)) {
    let regexp = new RegExp(notRegex);
    let matches = regexp.exec(line);
    let value = ~ calcValue(matches[1]);
    memory.set(variable, `${value} -> ${variable}`);
    return value;
  } else if (line.match(lshiftRegex)) {
    let regexp = new RegExp(lshiftRegex);
    let matches = regexp.exec(line);
    let value = calcValue(matches[1]) << matches[2];
    memory.set(variable, `${value} -> ${variable}`);
    return value;
  } else if (line.match(rshiftRegex)) {
    let regexp = new RegExp(rshiftRegex);
    let matches = regexp.exec(line);
    let value = calcValue(matches[1]) >> matches[2];
    memory.set(variable, `${value} -> ${variable}`);
    return value;
  }
}

const solution1 = calcValue(goal);
console.log(`part 1: value of ${goal} = ` + solution1);


// part 2
readInput();
memory.set('b', `${solution1} -> b`);
console.log(`part 2: value of ${goal} = ` + calcValue(goal));
