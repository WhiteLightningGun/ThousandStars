import angularDistanceCheck from "./angular_distance_check";
import orthographicProjection from "./orthographic_projection";
import MaxMagnitudeForFOV from "./max_magnitude_for_fov";
import GetStarColour from "./Spectrum_Colour";

/*

  Each list entry in data obeys following schematic:
    ['StarID', 'ProperName', 'RA', 'Dec', 'Mag', 'Spectrum']
*/

/**
 * Draws the stars and their names if they have one
 * @param {*} ref
 * @param {*} data
 * @param {*} radius
 * @param {*} RadiusCoFactor
 * @param {*} windowWidth
 * @param {*} windowHeight
 * @param {*} Fov
 * @param {*} Dec
 * @param {*} Ra
 */
function drawStars(
  ref,
  data,
  radius,
  RadiusCoFactor,
  windowWidth,
  windowHeight,
  Fov,
  Dec,
  Ra,
  textOpacity = "FF"
) {
  const canvas = ref.current;
  const ctx = canvas.getContext("2d");
  let maxMagnitude = MaxMagnitudeForFOV(Fov);
  let dataLength = Object.keys(data).length;

  for (let i = 0; i < dataLength; i++) {
    //select colour for this star
    ctx.strokeStyle = GetStarColour(data[i][5]);
    ctx.fillStyle = GetStarColour(data[i][5]);

    if (angularDistanceCheck(Fov, Dec, Ra, data[i][3], data[i][2])) {
      let coords = orthographicProjection(
        radius * RadiusCoFactor,
        Dec,
        Ra,
        data[i][3],
        data[i][2]
      );

      if (data[i][1] !== "N/A") {
        // i.e. if the star has a name, it is drawn with larger radius
        ctx.strokeStyle = GetStarColour(data[i][5]) + textOpacity;
        ctx.fillStyle = GetStarColour(data[i][5]) + textOpacity;

        ctx.fillText(
          data[i][1],
          coords[0] + 0.5 * windowWidth + 8,
          coords[1] + 0.5 * windowHeight + 10
        );
        ctx.strokeStyle = GetStarColour(data[i][5]);
        ctx.fillStyle = GetStarColour(data[i][5]);
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.arc(
          coords[0] + 0.5 * windowWidth,
          coords[1] + 0.5 * windowHeight,
          5 - data[i][4],
          0,
          2 * Math.PI
        );
        ctx.stroke();
        ctx.fill();
      } else if (maxMagnitude > data[i][4]) {
        //do nothing if star is not bright and has Mag < maxMagnitude
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.arc(
          coords[0] + 0.5 * windowWidth,
          coords[1] + 0.5 * windowHeight,
          5 - data[i][4],
          0,
          2 * Math.PI
        );
        ctx.stroke();
        ctx.fill();
      }
    }
  }
}

export default drawStars;
