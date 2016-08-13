var shuffle = function(string) {
  var parts = string.split('');

  for (var i = 0, len = parts.length; i < len; i++) {
    var j = Math.floor( Math.random() * ( i + 1 ) );
    var temp = parts[i];
    parts[i] = parts[j];
    parts[j] = temp;
  }

  return parts.join('');
};

module.exports = shuffle;
