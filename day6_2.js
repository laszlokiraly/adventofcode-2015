const Utils = require('./utils.js');
var Util = new Utils();

fs = require('fs');
var input = fs.readFileSync('input/day6.txt', 'utf8');

var lines = input.split("\r\n", 300); // hack: else node would read last line as empty line
var commands = [];

for (line of lines) {
  commands.push(parseCommandFromTo(line));
}

var grid = Util.createGrid(1000, 0);

for (command of commands) {
  for (var i = command.from.x; i <= command.to.x; i++) {
    for (var j = command.from.y; j <= command.to.y; j++) {
      if (command.action === 0) {
        if (grid[i][j] > 0) {
          grid[i][j] -= 1;
        }
      } else if (command.action === 1) {
        grid[i][j] += 1;
      } else {
        grid[i][j] += 2;
      }
    }
  }
}
console.log(countLightsBrightness(grid));

function countLightsBrightness(grid) {
  var lightsBrightness = 0;
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      lightsBrightness += grid[i][j];
    }
  }
  return lightsBrightness;
}

function parseCommandFromTo(line) {
  var result = {
    action: '',
    from: {
      x: 0,
      y: 0
    },
    to: {
      x: 0,
      y: 0
    }
  }

  if (line.indexOf('turn off') > -1) {
    result.action = 0;
  } else if (line.indexOf('turn on') > -1) {
    result.action = 1;
  } else if (line.indexOf('toggle') > -1) {
    result.action = -1;
  }

  var coords = line.match(/[0-9]+/g);
  // had to lookup https://www.reddit.com/r/adventofcode/comments/3vmltn/day_6_solutions/
  result.from.x = Math.min(coords[0], coords[2]);
  result.from.y = Math.min(coords[1], coords[3]);
  result.to.x = Math.max(coords[0], coords[2]);
  result.to.y = Math.max(coords[1], coords[3]);

  return result;
}
