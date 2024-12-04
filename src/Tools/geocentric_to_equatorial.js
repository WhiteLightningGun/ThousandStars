function geocentricToEquatorial(lon, lat, obliquity) {
  const toRadians = (degrees) => degrees * (Math.PI / 180);
  obliquity = toRadians(obliquity);
  const X = Math.cos(lat) * Math.cos(lon);
  const Y =
    Math.cos(lat) * Math.sin(lon) * Math.cos(obliquity) -
    Math.sin(lat) * Math.sin(obliquity);
  const Z =
    Math.cos(lat) * Math.sin(lon) * Math.sin(obliquity) +
    Math.sin(lat) * Math.cos(obliquity);

  const dec = Math.asin(Z);

  let ra = Math.atan2(Y, X);

  if (ra < 0) {
    ra += 2 * Math.PI;
  }

  return { ra, dec };
}

export default geocentricToEquatorial;
