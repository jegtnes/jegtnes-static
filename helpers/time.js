var moment = require('moment');

module.exports = function(timestamp, isUTC = false) {
  if (isUTC === true) {
    return moment(timestamp).format('YYYY-MM-DD');
  }

  else {
    return moment(timestamp).format('Do MMMM YYYY');
  }

}
