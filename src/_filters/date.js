const ordinal = require("ordinal");
const { DateTime } = require("luxon");

module.exports.humanPostDate = function (date) {
  const luxonDate = DateTime.fromJSDate(date).toUTC();

  const ordinaledDay = ordinal(luxonDate.day);
  return `${ordinaledDay} ${luxonDate.monthLong} ${luxonDate.year}`;
};

module.exports.isoPostDate = function (date) {
  return DateTime.fromJSDate(date).toUTC().toISODate();
};
