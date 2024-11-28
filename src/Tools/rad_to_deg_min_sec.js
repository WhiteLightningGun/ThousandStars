function radToDegMinSec(radians) {
  // Convert radians to degrees
  let degrees = radians * (180 / Math.PI);

  // Extract the integer part of degrees
  const deg = Math.floor(degrees);

  // Extract the fractional part and convert to minutes
  const minutesFull = (degrees - deg) * 60;
  const min = Math.floor(minutesFull);

  // Extract the fractional part of minutes and convert to seconds
  const secondsFull = (minutesFull - min) * 60;
  const sec = Math.round(secondsFull * 100) / 100; // Round to 2 decimal places

  // Return the formatted string
  return `${deg}° ${min}' ${sec}"`;
}

export default radToDegMinSec;
