import { julian, moonposition, moonillum, solar, base } from "astronomia";
import geocentricToEquatorial from "../Tools/geocentric_to_equatorial";

const OBLIQUITY = 23.43604;
const MOON_RADIUS_KM = 1737.4;

/**
 * Computes the current positions of the Moon at this moment in time using the Astronomia library
 * @param {*} currentDate currentData will be the object returned from javascript new Date() function
 * @returns Returns an array of form [ra, dec, radius, colour, name, phase, angular size]
 */
export function GetLunarData(currentDate) {
  const currentJDE = julian.CalendarGregorianToJD(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate() +
      +currentDate.getHours() / 24 +
      currentDate.getMinutes() / 1440 +
      currentDate.getSeconds() / 86400
  ); // Julian Date

  const solarPosition = solar.apparentEquatorial(currentJDE);
  const cSun = {
    ra: solarPosition._ra,
    dec: solarPosition._dec,
    range: 147153932,
  };

  const moon = moonposition.position(currentJDE);
  const moonPositionEquatorial = geocentricToEquatorial(
    moon._ra,
    moon._dec,
    OBLIQUITY
  );
  const cMoon = {
    ra: moonPositionEquatorial.ra,
    dec: moonPositionEquatorial.dec,
    range: moon.range,
  };
  const phaseAngle = moonillum.phaseAngleEquatorial(cMoon, cSun);
  const limb = base.limb(cMoon, cSun);
  const distanceToMoon = moon.range; // distance to moon from Earth to Moon in km
  const angularSize = calculateAngularSize(distanceToMoon, MOON_RADIUS_KM);

  // [ra, dec, radius, colour, name, phase angle radians, angular size],
  return [
    moonPositionEquatorial.ra,
    moonPositionEquatorial.dec,
    6,
    "#FFFFDD",
    "Moon",
    phaseAngle,
    angularSize,
    limb,
  ];
}

/**
 * Returns angular size in degrees
 */
function calculateAngularSize(distance, radius) {
  const angularSizeInRadians = 2 * Math.atan(radius / distance);
  return angularSizeInRadians * (180 / Math.PI);
}
