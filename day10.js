var applyLookAndSay = function(number) {
  var times = 1;
  var digit = number[0];
  var result = "";
  for (var i = 1; i < number.length; i++) {
    if (number[i] === digit) {
      times++;
    } else {
      result = result + times + digit;
      times = 1;
    }
    digit = number[i];
  }
  return result + times + digit;
}

var result = "1321131112";
for ( var i = 1; i <= 50; i ++) {
  result = applyLookAndSay(result);
}

console.log(result.length);
