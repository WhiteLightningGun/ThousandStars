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

  let localFov = Math.min(1.2 * Fov, 180);

  const halfWindowWidth = 0.5 * window.innerWidth;
  const halfWindowHeight = 0.5 * window.innerHeight;
  const adjustedRadius = radius * RadiusCoFactor;

  let allConstellationsLength = AllConstellations.length;

  for (let i = 0; i < allConstellationsLength; i++) {
    let constellationLength = AllConstellations[i].length;

    for (let j = 0; j < constellationLength; j++) {
      let subConstellationLength = AllConstellations[i][j].length;

      for (let k = 0; k < subConstellationLength - 1; k++) {
        // Decide whether or not to calculate and draw line depending on if it is within current Fov
        if (
          angularDistanceCheck(
            localFov,
            Dec,
            Ra,
            AllConstellations[i][j][k][0],
            AllConstellations[i][j][k][1]
          )
        ) {
          let coord1 = orthographicProjection(
            adjustedRadius,
            Dec,
            Ra,
            AllConstellations[i][j][k][0],
            AllConstellations[i][j][k][1]
          );
          let coord2 = orthographicProjection(
            adjustedRadius,
            Dec,
            Ra,
            AllConstellations[i][j][k + 1][0],
            AllConstellations[i][j][k + 1][1]
          );

          ctx.beginPath();
          ctx.moveTo(coord1[0] + halfWindowWidth, coord1[1] + halfWindowHeight);
          ctx.lineTo(coord2[0] + halfWindowWidth, coord2[1] + halfWindowHeight);

          ctx.strokeStyle = lineColour;
          ctx.stroke();
        }
      }
    }
  }
}

export default DrawConstellations;
