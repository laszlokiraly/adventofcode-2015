'use strict'

class Utils {

  constructor(){
    this.begin = undefined;
    this.end = undefined;
  }

  createGrid(gridSize, intialValue) {
    var grid = [];
    for (var i = 0; i < gridSize; i++) {
      grid[i] = [];
      for (var j = 0; j < gridSize; j++) {
        grid[i][j] = intialValue;
      }
    }
    return grid;
  }

  beginTiming() {
    this.begin = new Date().getTime();
  }

  endTimingAndLog() {
    this.end = new Date().getTime();
    var time = this.end - this.begin;
    console.log('Overall execution time: ' + time);
    this.begin = undefined;
    this.end = undefined;
  }
}

module.exports = Utils
