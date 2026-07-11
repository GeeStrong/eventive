/**
 * Combines an event's date and time strings into a single Date object.
 * @param {string} date A date string in YYYY-MM-DD format.
 * @param {string} time A time string in HH:MM format.
 * @returns {Date} The combined date and time.
 */
export function combineDateAndTime(date, time) {
  return new Date(`${date}T${time || "00:00"}`);
}

/**
 * Formats a date string for friendly display, e.g. "Fri, 10 Jul 2026".
 * @param {string} date A date string in YYYY-MM-DD format.
 * @returns {string} The formatted date.
 */
export function formatDisplayDate(date) {
  if (!date) return "";
  const parsed = new Date(`${date}T00:00`);
  return parsed.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Formats a time string for friendly display, e.g. "2:30 PM".
 * @param {string} time A time string in HH:MM format.
 * @returns {string} The formatted time.
 */
export function formatDisplayTime(time) {
  if (!time) return "";
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${displayHours}:${String(minutes).padStart(2, "0")} ${period}`;
}

/**
 * Determines whether an event's date/time is in the future (or now).
 * @param {{date: string, time: string}} event The event to check.
 * @returns {boolean} True if the event has not yet passed.
 */
export function isUpcoming(event) {
  return combineDateAndTime(event.date, event.time).getTime() >= Date.now();
}

/**
 * Sorts events chronologically by combined date and time.
 * @param {Array<Object>} events The events to sort.
 * @returns {Array<Object>} A new, sorted array.
 */
export function sortByDateTime(events) {
  return [...events].sort(
    (a, b) =>
      combineDateAndTime(a.date, a.time).getTime() -
      combineDateAndTime(b.date, b.time).getTime(),
  );
}
