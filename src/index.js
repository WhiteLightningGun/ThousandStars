import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MobileProvider } from "./MobileContext";
import { solar, julian, planetposition, precess, base } from "astronomia";
import radToDegMinSec from "./Tools/radtodegminsec";
import radToHoursMinSec from "./Tools/rad_to_hours_mins_secs";
import planetData from "astronomia/data";

const root = ReactDOM.createRoot(document.getElementById("root"));
const date = new Date();
const axialTilt = 0.4090926291454;
const currentJDE = julian.CalendarGregorianToJD(
  date.getFullYear(),
  date.getMonth() + 1,
  date.getDate() +
    date.getHours() / 24 +
    date.getMinutes() / 1440 +
    date.getSeconds() / 86400
); // Julian Date

const solarRes = solar.apparentEquatorial(currentJDE);

console.log(
  `current solar apprentEquatorial coords (radians): ${solarRes._ra}, ${solarRes._dec}`
); //returns { ra, dec } in radians
// Load planetary data for Mars
const mars1 = new planetposition.Planet(planetData.vsop87Dmars);
const jupiter1 = new planetposition.Planet(planetData.vsop87Djupiter);
console.log(mars1);
console.log(mars1.position(currentJDE));
//to work you need to add axial tilt angle ~23.44 deg to declination

const precession = precess.approxAnnualPrecession(
  { ra: 0, dec: 0.0 },
  base.JDEToJulianYear(2000),
  base.JDEToJulianYear(2024)
);
console.log(precession);
let resultJupiter =
  "Jupiter: " +
  radToHoursMinSec(jupiter1.position(currentJDE)._ra) +
  " / " +
  radToDegMinSec(jupiter1.position(currentJDE)._dec + axialTilt);

console.log(resultJupiter);

let resultMars =
  "Mars: " +
  radToHoursMinSec(mars1.position(currentJDE)._ra) +
  " / " +
  radToDegMinSec(mars1.position(currentJDE)._dec + axialTilt);

console.log(resultMars);

root.render(
  <React.StrictMode>
    <MobileProvider>
      <App />
    </MobileProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
