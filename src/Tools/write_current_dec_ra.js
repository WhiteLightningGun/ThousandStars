/**
 * Writes the current declination and right ascension values to lower left of canvas converted to degrees, hours, rounded to two decimals
 */
function writeCurrentDecRa(ref, Dec, Ra, xPos, yPos) {
  const canvas = ref.current;
  const context = canvas.getContext("2d");

  const DEG_CONVERSION = 57.29577951;
  const HOUR_CONVERSION = 3.819718634;

  context.strokeStyle = "white";
  context.fillStyle = "white";
  context.fillText(
    `Dec: ${(Dec * DEG_CONVERSION).toFixed(2)} deg, Ra: ${(
      Ra * HOUR_CONVERSION
    ).toFixed(2)} hours`,
    xPos,
    yPos
  );
}

export default writeCurrentDecRa;
