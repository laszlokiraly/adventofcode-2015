// to generate grammar do:
// $ npm install
// $ ./node_modules/.bin/nearleyc day7_grammar.ne > day7_grammar.js
const nearley = require("nearley");
const grammar = require("./day7_grammar.js");

// Create a Parser object from our grammar.
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

parser.feed("123 -> x");
// parser.feed("NOT e -> f");
// parser.feed("x AND y -> z");
// parser.feed("p LSHIFT 2 -> q");

console.log(parser.results);
console.log(parser.table);
