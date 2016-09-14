module.exports = function(item, beginsWith) {
  if (!item) {
    console.error('You need to pass in an item.');
    return false;
  }

  if (!beginsWith) {
    console.error('You need to pass in the check string.');
    return false;
  }

  return item.startsWith(beginsWith);
}
