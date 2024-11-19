import AllConstellations from "../Constellations/allconstellations";
import angularDistanceCheck from "./angular_distance_check";
import orthographicProjection from "./orthographic_projection";

function DrawConstellations(
  ref,
  Fov,
  Dec,
  Ra,
  radius,
  RadiusCoFactor,
  lineColour = "#343742FF"
) {
  const canvas = ref.current;
  const ctx = canvas.getContext("2d");

  ctx.lineWidth = 2;
  ctx.strokeStyle = lineColour;

  let localFov = Math.min(1.5 * Fov, 180); // slightly expanding the Fov for the purposes of drawing constellation lines prevents them vanishing too soon at the edges

  const halfWindowWidth = 0.5 * window.innerWidth;
  const halfWindowHeight = 0.5 * window.innerHeight;
  const adjustedRadius = radius * RadiusCoFactor;

  let allConstellationsLength = AllConstellations.length;

  for (let i = 0; i < allConstellationsLength; i++) {
    let constellationLength = AllConstellations[i].length;

    for (let j = 0; j < constellationLength; j++) {
      let subConstellation = AllConstellations[i][j];
      let subConstellationLength = subConstellation.length;

      for (let k = 0; k < subConstellationLength - 1; k++) {
        // Decide whether or not to calculate and draw line depending on if it is within current Fov
        if (
          angularDistanceCheck(
            localFov,
            Dec,
            Ra,
            subConstellation[k][0],
            subConstellation[k][1]
          )
        ) {
          let coord1 = orthographicProjection(
            adjustedRadius,
            Dec,
            Ra,
            subConstellation[k][0],
            subConstellation[k][1]
          );
          let coord2 = orthographicProjection(
            adjustedRadius,
            Dec,
            Ra,
            subConstellation[k + 1][0],
            subConstellation[k + 1][1]
          );

          ctx.beginPath();
          ctx.moveTo(coord1[0] + halfWindowWidth, coord1[1] + halfWindowHeight);
          ctx.lineTo(coord2[0] + halfWindowWidth, coord2[1] + halfWindowHeight);

          ctx.stroke();
        }
      }
    }
  }
}

export default DrawConstellations;
