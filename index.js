/**
 * Predicts the day of the week for a given date after adding or subtracting a number of years.
 * 
 * @param {number} year - The base year.
 * @param {number} month - The base month (1-12).
 * @param {number} day - The base day of the month.
 * @param {number} numYear - The number of years to add (for future) or subtract (for past).
 * @param {string} timePeriod - A string indicating whether to look into the 'future' or 'past'.
 * @returns {string} - The day of the week for the calculated date.
 *
 * @example
 * // Returns 'Friday'
 * predictDayOfWeek(2023, 10, 27, 0, 'future');
 */
const predictDayOfWeek = (year, month, day, numYear, timePeriod) => {
    const daysOfWeek = {
        '0': 'Sunday',
        '1': 'Monday',
        '2': 'Tuesday',
        '3': 'Wednesday',
        '4': 'Thursday',
        '5': 'Friday',
        '6': 'Saturday'
    };

    const futureYear = year + numYear;
    const pastDate = Math.abs(year - numYear);

    const targetDate = timePeriod === 'future' ? futureYear : pastDate;
    const d = new Date(targetDate, month - 1, day);

    const futureDate = d.getUTCDay();

    return daysOfWeek[futureDate.toString()];
};

console.log(predictDayOfWeek(2023, 10, 27, 0, 'future')); // This will print 'Friday' for October 27, 2023.

module.exports = predictDayOfWeek;
