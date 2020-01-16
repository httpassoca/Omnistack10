module.exports = function parseStringAsArray(ArrayAsString) {
  return ArrayAsString.split(",").map(array => array.trim());
};
