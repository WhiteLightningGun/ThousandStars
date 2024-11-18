// Calculates the max magnitude a star can have for a given FOV field of view
// uses a straight line graph to interpolate between limits of FOV,
// with Fov = 30 producing result = 1, Fov = 180 producing result = 3 which means the smallest stars will be drawn with a radius of 3

function MaxMagnitudeForFOV(fov) {
  let maxMagnitude;
  //maxMagnitude = 0.0333333333333 * fov - 2;
  maxMagnitude = -0.025 * fov + 7.5; // this setting draws stars up to magnitude 3 at fov = 180 and magnitude 7 at fov = 20
  //maxMagnitude = -1;
  return maxMagnitude;
}

export default MaxMagnitudeForFOV;
