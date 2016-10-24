// extended https://www.reddit.com/r/adventofcode/comments/3vmltn/day_6_solutions/
// by using RxJS 4
const Utils = require('./utils.js');
var Util = new Utils();

var Rx = require('rx');
var readline = require('readline');
var fs = require('fs');

var rl = readline.createInterface({
  input: fs.createReadStream('input/day6.txt')
});

Util.beginTiming();

var input = Rx.Observable.fromEvent(rl, 'line')
  .takeUntil(Rx.Observable.fromEvent(rl, 'close'))
  .map(parseCommand)
  .reduce(applyCommand, [])
  .map(countTheLights)
  .subscribe(logResult);

function logResult(x) {
  console.log(x);
  Util.endTimingAndLog();
}

function parseCommand(text) {
  var parsed = text.match(/(.*) (\d+),(\d+) through (\d+),(\d+)/);
  return {
    action: parsed[1],
    from: {
      x: Math.min(parsed[2], parsed[4]),
      y: Math.min(parsed[3], parsed[5])
    },
    to: {
      x: Math.max(parsed[2], parsed[4]),
      y: Math.max(parsed[3], parsed[5])
    }
  }
}

// applyCommand is not to be used concurrently, because the order of the actions
// matter for the solution.
// e.g. turn off, turn on, toggle != turn off, toggle, turn on
function applyCommand(grid, command) {
  for (var x = command.from.x; x <= command.to.x; x++) {
    for (var y = command.from.y; y <= command.to.y; y++) {
      if (grid[x] == undefined) grid[x] = [];
      switch (command.action) {
        case "turn on":
          grid[x][y] = true;
          break;
        case "turn off":
          grid[x][y] = false;
          break;
        case "toggle":
          if (grid[x][y] == undefined) {
            grid[x][y] = true;
          } else {
            grid[x][y] = !grid[x][y];
          }
          break;
      }
    }
  }
  return grid;
}

function countTheLights(grid) {
  var count = 0;
  for (var i = 0; i < grid.length; i++) {
    if (!!grid[i]) {
      for (var j = 0; j < grid[i].length; j++) {
        if (grid[i][j]) {
          count++;
        }
      }
    }
  }
  return count;
}
