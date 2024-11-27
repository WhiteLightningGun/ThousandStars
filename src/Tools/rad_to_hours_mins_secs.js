function radToHoursMinSec(radians) {
  // Convert radians to hours
  let hours = radians * (12 / Math.PI);

  // Extract the integer part of hours
  const hrs = Math.floor(hours);

  // Extract the fractional part and convert to minutes
  const minutesFull = (hours - hrs) * 60;
  const min = Math.floor(minutesFull);

  // Extract the fractional part of minutes and convert to seconds
  const secondsFull = (minutesFull - min) * 60;
  const sec = Math.round(secondsFull * 100) / 100; // Round to 2 decimal places

  // Return the formatted string
  return `${hrs}h ${min}m ${sec}s`;
}

export default radToHoursMinSec;
