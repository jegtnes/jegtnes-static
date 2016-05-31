var moment = require('moment');

module.exports = function(timestamp, isISOFormat = false) {
  if (isISOFormat === true) {
    return moment(timestamp).format('YYYY-MM-DD');
  }

  else {
    return moment(timestamp).format('Do MMMM YYYY');
  }

}
