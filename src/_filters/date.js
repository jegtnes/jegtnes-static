import ordinal from "ordinal";
import { DateTime } from "luxon";

export function humanPostDate (date) {
  const luxonDate = DateTime.fromJSDate(date).toUTC();

  const ordinaledDay = ordinal(luxonDate.day);
  return `${ordinaledDay} ${luxonDate.monthLong} ${luxonDate.year}`;
}

export function isoPostDate (date) {
  return DateTime.fromJSDate(date).toUTC().toISODate();
}
