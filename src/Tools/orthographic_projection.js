/**
 *
 * @param radius scales the result;
 * @param phi0 phi0, phi1 : latitude, or decRa
 * @param l0 l0, l1 : longitude, or raRad
 * @param phi1 phi0, phi1 : latitude, or decRa
 * @param l1 l0, l1 : longitude, or raRad
 * @returns
 */

function orthographicProjection(radius, phi0, l0, phi1, l1) {
  const deltaL = l1 - l0;
  const cosPhi1 = Math.cos(phi1);
  const sinPhi1 = Math.sin(phi1);
  const cosPhi0 = Math.cos(phi0);
  const sinPhi0 = Math.sin(phi0);
  const cosDeltaL = Math.cos(deltaL);
  const sinDeltaL = Math.sin(deltaL);

  let x = radius * cosPhi1 * sinDeltaL;
  let y = radius * (cosPhi0 * sinPhi1 - sinPhi0 * cosPhi1 * cosDeltaL);

  return [-x, -y];
} //return coords x, y suitable for current canvas configuration

export default orthographicProjection;
