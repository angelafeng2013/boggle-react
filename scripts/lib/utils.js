var shuffle = function(string) {
  // shuffle function to be used for loading letters on the board
  var parts = string.split('');
  var len = parts.length;
  for (var i=0; i < len; i++) {
    var j = Math.floor( Math.random() * ( i + 1 ) );
    var temp = parts[i];
    parts[i] = parts[j];
    parts[j] = temp;
  }
  return parts.join('');
};

var searchArray = function(arr, value) {
  // searches an array of objects for an object with value stored under the
  // key "word"
  for (var i=0; i < arr.length; i++) {
    if (arr[i].word == value) {
        return true;
    }
  }
  return false;
}

module.exports = {shuffle, searchArray};
