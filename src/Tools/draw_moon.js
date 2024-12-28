import angularDistanceCheck from "./angular_distance_check";
import orthographicProjection from "./orthographic_projection";
import { DrawMoonPhase } from "./draw_moon_phase";
//import MaxMagnitudeForFOV from "./max_magnitude_for_fov";
//import { GetPlanetImage } from "./planet_images";
/**
 *
 * @param {*} ref
 * @param {*} moonData has form [ra, dec, radius, colour, name, phase angle radians, angular size, limb]
 * @param {*} radius
 * @param {*} RadiusCoFactor
 * @param {*} windowWidth
 * @param {*} windowHeight
 * @param {*} Fov
 * @param {*} Dec
 * @param {*} Ra
 * @param {*} textOpacity
 */
function DrawMoon(
  ref,
  moonData,
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
  const halfWindowWidth = 0.5 * windowWidth;
  const halfWindowHeight = 0.5 * windowHeight;
  const moonColour = moonData[3];
  const longestWindowSide =
    halfWindowHeight > halfWindowWidth ? halfWindowHeight : halfWindowWidth;

  const moonSizeFov =
    longestWindowSide * (moonData[6] / Fov) < moonData[2]
      ? moonData[2]
      : longestWindowSide * (moonData[6] / Fov);

  if (angularDistanceCheck(Fov, Dec, Ra, moonData[1], moonData[0])) {
    let coords = orthographicProjection(
      radius * RadiusCoFactor,
      Dec,
      Ra,
      moonData[1],
      moonData[0]
    );

    const moonColourWithOpacity = moonColour + textOpacity;
    ctx.fillStyle = moonColourWithOpacity;
    ctx.fillText(
      moonData[4],
      coords[0] + halfWindowWidth + moonSizeFov + 5,
      coords[1] + halfWindowHeight + moonSizeFov * 0.5 + 2
    );
    drawInDetail(
      ctx,
      coords,
      windowWidth,
      windowHeight,
      moonSizeFov,
      moonColour,
      moonData[5],
      moonData[7]
    );
  }
}

function drawInDetail(
  ctx,
  coords,
  windowWidth,
  windowHeight,
  radius,
  color,
  phase,
  limb
) {
  const image = false;

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
    DrawMoonPhase(
      ctx,
      coords,
      windowWidth,
      windowHeight,
      radius,
      color,
      phase,
      limb
    );
  }
}
export default DrawMoon;
