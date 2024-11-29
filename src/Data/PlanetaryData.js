import { julian, planetposition, elliptic, solar } from "astronomia";
import planetData from "astronomia/data";

/**
 * Computes the current positions of the planets at this moment in time using the Astronomia library
 * @param {*} currentDate currentData will be the object returned from javascript new Date() function
 * @returns Returns a planet array of form [ra, dec, radius, colour, name]
 */
export function GetPlanetaryPositions(currentDate) {
  const currentJDE = julian.CalendarGregorianToJD(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate() +
      currentDate.getHours() / 24 +
      currentDate.getMinutes() / 1440 +
      currentDate.getSeconds() / 86400
  ); // Julian Date

  const earth = new planetposition.Planet(planetData.vsop87Dearth);
  const mercury = new planetposition.Planet(planetData.vsop87Dmercury);
  const venus = new planetposition.Planet(planetData.vsop87Dvenus);
  const mars = new planetposition.Planet(planetData.vsop87Dmars);
  const jupiter = new planetposition.Planet(planetData.vsop87Djupiter);
  const saturn = new planetposition.Planet(planetData.vsop87Dsaturn);
  const uranus = new planetposition.Planet(planetData.vsop87Buranus); // for some mysterious reason vsop87B data here is more accurate
  const neptune = new planetposition.Planet(planetData.vsop87Dneptune);

  const mercuryPosition = elliptic.position(mercury, earth, currentJDE);
  const venusPosition = elliptic.position(venus, earth, currentJDE);
  const marsPosition = elliptic.position(mars, earth, currentJDE);
  const jupiterPosition = elliptic.position(jupiter, earth, currentJDE);
  const saturnPosition = elliptic.position(saturn, earth, currentJDE);
  const uranusPosition = elliptic.position(uranus, earth, currentJDE);
  const neptunePosition = elliptic.position(neptune, earth, currentJDE);
  const solarPosition = solar.apparentEquatorial(currentJDE);

  // [ra, dec, radius, colour, name], // [ra, dec, radius, colour, name, average angular size in radians] for jupiter
  return [
    [mercuryPosition.ra, mercuryPosition.dec, 3, "#87ecf9", "Mercury"],
    [venusPosition.ra, venusPosition.dec, 5, "#f5e042", "Venus"],
    [marsPosition.ra, marsPosition.dec, 6, "#d30900", "Mars"],
    [jupiterPosition.ra, jupiterPosition.dec, 9, "#f77371", "Jupiter"],
    [saturnPosition.ra, saturnPosition.dec, 8, "#f5d142", "Saturn"],
    [uranusPosition.ra, uranusPosition.dec, 6.5, "#42d4f5", "Uranus"],
    [neptunePosition.ra, neptunePosition.dec, 6.5, "#425df5", "Neptune"],
    [solarPosition._ra, solarPosition._dec, 12, "#FFFFAA", "Sol"],
  ];
}
