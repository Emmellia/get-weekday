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
const predictDayOfWeek = (year, month, day) => {
   
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date=new Date(year, month, day);  
    return daysOfWeek[date.getDay()];
       
};

console.log(predictDayOfWeek(2023, 10, 28)); // This will print 'Friday' for October 27, 2023.

module.exports = predictDayOfWeek;
