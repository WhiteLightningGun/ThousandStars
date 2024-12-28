import angularDistanceCheck from "./angular_distance_check";
import orthographicProjection from "./orthographic_projection";
import MaxMagnitudeForFOV from "./max_magnitude_for_fov";
//import { GetPlanetImage } from "./planet_images";
/**
 *
 * @param {*} ref
 * @param {*} planetData has form [ra, dec, radius, colour, name]
 * @param {*} radius
 * @param {*} RadiusCoFactor
 * @param {*} windowWidth
 * @param {*} windowHeight
 * @param {*} Fov
 * @param {*} Dec
 * @param {*} Ra
 * @param {*} textOpacity
 */
function DrawPlanets(
  ref,
  planetData,
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
  let dataLength = planetData.length;
  const halfWindowWidth = 0.5 * windowWidth;
  const halfWindowHeight = 0.5 * windowHeight;

  for (let i = 0; i < dataLength; i++) {
    const planetColour = planetData[i][3];

    if (
      angularDistanceCheck(Fov, Dec, Ra, planetData[i][1], planetData[i][0])
    ) {
      let coords = orthographicProjection(
        radius * RadiusCoFactor,
        Dec,
        Ra,
        planetData[i][1],
        planetData[i][0]
      );

      if (planetData[i][4] !== "N/A") {
        const planetColourWithOpacity = planetColour + textOpacity;
        ctx.fillStyle = planetColourWithOpacity;
        ctx.fillText(
          planetData[i][4],
          coords[0] + halfWindowWidth + planetData[i][2] + 5,
          coords[1] + halfWindowHeight + planetData[i][2] * 0.5 + 2
        );
        drawPlanet(
          ctx,
          coords,
          windowWidth,
          windowHeight,
          planetData[i][2],
          planetColour,
          planetData[i][4]
        );
      } else if (maxMagnitude > planetData[i][2]) {
        //do nothing if star is not bright and has Mag < maxMagnitude
        drawPlanet(
          ctx,
          coords,
          windowWidth,
          windowHeight,
          planetData[i][2],
          planetColour,
          planetData[i][4]
        );
      }
    }
  }
}

function drawPlanet(
  ctx,
  coords,
  windowWidth,
  windowHeight,
  radius,
  color,
  name
) {
  const image = false; //GetPlanetImage(name); omitting planet images for now

  if (image) {
    // Draw the image if it exists
    image.onload = () => {
      ctx.drawImage(
        image,
        coords[0] + 0.5 * windowWidth - radius,
        coords[1] + 0.5 * windowHeight - radius,
        radius * 2,
        radius * 2
      );
    };

    // If the image is already loaded, draw it immediately
    if (image.complete) {
      ctx.drawImage(
        image,
        coords[0] + 0.5 * windowWidth - radius,
        coords[1] + 0.5 * windowHeight - radius,
        radius * 2,
        radius * 2
      );
    }
  } else {
    // Fallback to drawing a circle if the image is not available
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.arc(
      coords[0] + 0.5 * windowWidth,
      coords[1] + 0.5 * windowHeight,
      radius,
      0,
      2 * Math.PI
    );
    ctx.stroke();
    ctx.fill();
  }
}
export default DrawPlanets;
