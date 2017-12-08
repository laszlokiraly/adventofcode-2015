var fs = require('fs');
var input = fs.readFileSync('day7.input', {encoding: 'utf-8'});

var assignment_regex = /^([0-9]+|[a-z]+) -> ([a-z]+)$/g;
var and_regex = /^([0-9]+|[a-z]+) (?:AND) ([a-z]+) -> ([a-z]+)$/g;
var or_regex = /^([a-z]+) (?:OR) ([a-z]+) -> ([a-z]+)$/g;
var rshift_regex = /^([a-z]+) (?:RSHIFT) ([0-9]+) -> ([a-z]+)$/g;
var lshift_regex = /^([a-z]+) (?:LSHIFT) ([0-9]+) -> ([a-z]+)$/g;
var not_regex = /^(?:NOT) ([a-z]+) -> ([a-z]+)$/g;

var memory = new Map();

function readInput() {
  memory = new Map()
  for (var line of input.split('\n')) {
    if (line != '') {
      var variable_regex = new RegExp(/^.* -> ([a-z]+)$/g)
      memory.set(variable_regex.exec(line)[1], line)
    }
  }
}
readInput()

var goal = 'a'

function calcValue(variable) {
  var line = memory.get(variable)
  if (line.match(assignment_regex)) {
    var regexp = new RegExp(assignment_regex);
    var matches = regexp.exec(line);
    if (isNaN(matches[1])) {
      var value = calcValue(matches[1])
      memory.set(variable, `${value} -> ${variable}`)
      return value
    } else {
      return matches[1]
    }
  } else if (line.match(and_regex)) {
    var regexp = new RegExp(and_regex);
    var matches = regexp.exec(line);
    if (isNaN(matches[1])) {
      var value = calcValue(matches[1]) & calcValue(matches[2])
      memory.set(variable, `${value} -> ${variable}`)
      return value
    } else {
      var value = matches[1] & calcValue(matches[2])
      memory.set(variable, `${value} -> ${variable}`)
      return value
    }
  } else if (line.match(or_regex)) {
    var regexp = new RegExp(or_regex);
    var matches = regexp.exec(line);
    if (isNaN(matches[1])) {
      var value = calcValue(matches[1]) | calcValue(matches[2])
      memory.set(variable, `${value} -> ${variable}`)
      return value
    } else {
      var value = matches[1] | calcValue(matches[2])
      memory.set(variable, `${value} -> ${variable}`)
      return value
    }
  } else if (line.match(not_regex)) {
    var regexp = new RegExp(not_regex);
    var matches = regexp.exec(line);
    var value = ~ calcValue(matches[1])
    memory.set(variable, `${value} -> ${variable}`)
    return value
  } else if (line.match(lshift_regex)) {
    var regexp = new RegExp(lshift_regex);
    var matches = regexp.exec(line);
    var value = calcValue(matches[1]) << matches[2]
    memory.set(variable, `${value} -> ${variable}`)
    return value
  } else if (line.match(rshift_regex)) {
    var regexp = new RegExp(rshift_regex);
    var matches = regexp.exec(line);
    var value = calcValue(matches[1]) >> matches[2]
    memory.set(variable, `${value} -> ${variable}`)
    return value
  }
}

var solution1 = calcValue(goal)
console.log(`part 1: value of ${goal} = ` + solution1)


// part 2
readInput()
memory.set('b', `${solution1} -> b`)
console.log(`part 2: value of ${goal} = ` + calcValue(goal))
