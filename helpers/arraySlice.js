module.exports = function(array, sliceLimit) {
  if (!array) {
    console.error('You need to pass in an array.');
    return false;
  }

  if (!sliceLimit) {
    console.error('You need to pass in a slice limit.');
    return false;
  }

  if (!Array.isArray(array)) {
    console.error('You can only pass in items of the array type.');
    return false;
  }

  if (!Number.isInteger(sliceLimit)) {
    console.error('You can only pass in an integer as the limit.');
    return false;
  }

  return array.slice(0, sliceLimit)
}
