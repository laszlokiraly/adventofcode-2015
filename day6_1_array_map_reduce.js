// from https://www.reddit.com/r/adventofcode/comments/3vmltn/day_6_solutions/

fs = require('fs');
var input = fs.readFileSync('input/day6.txt', 'utf8');

function parseCommand(text) {
  var parsed = text.match(/(.*) (\d+),(\d+) through (\d+),(\d+)/);
  return {
    action : parsed[1],
    start : {x:Math.min(parsed[2],parsed[4]), y:Math.min(parsed[3],parsed[5])},
    end : {x:Math.max(parsed[2],parsed[4]), y:Math.max(parsed[3],parsed[5])} }
}

function applyCommand(grid, command) {
  for( var x=command.start.x; x<=command.end.x; x++ ) {
    for( var y=command.start.y; y<=command.end.y; y++ ) {
      if (grid[x] == undefined) grid[x] = [];
      switch(command.action) {
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

// the good the bad and the ugly
// var t0 = performance.now(); // but not in node 4.2.2
console.time('applyCommand');
var begin = new Date().getTime();

// applyCommand is not to be used concurrently, because the order of the actions
// matter for the solution.
// e.g. turn off, turn on, toggle != turn off, toggle, turn on
console.log(input.split("\r\n", 300)
.map(parseCommand)
.reduce(applyCommand, [])
.reduce(function(count,row){
  // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
  // filter() erstellt ein neues Array, das alle Elemente enthält, die den Test, der in der angegebenen Callback Function implementiert ist, bestehen.
  return count + row.filter(function(l){
    return l;
  }).length
},0));

// http://stackoverflow.com/questions/313893/how-to-measure-time-taken-by-a-function-to-execute
console.timeEnd('applyCommand');
// var t1 = performance.now();
// console.log("Call to main took " + (t1 - t0) + " milliseconds.")
var end = new Date().getTime();
var time = end - begin;
console.log('Overall execution time: ' + time);
