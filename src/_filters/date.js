const ordinal = require("ordinal");
const { DateTime } = require("luxon");

module.exports = function humanPostDate(date) {
  const luxonDate = DateTime.fromJSDate(date).toUTC();

  const ordinaledDay = ordinal(luxonDate.day);
  return `${ordinaledDay} ${luxonDate.monthLong} ${luxonDate.year}`;
};
