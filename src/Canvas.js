import React from "react";
import useCanvas from "./use_canvas";
import "./Components/css/canvas.css";
import orthographicProjection from "./Tools/orthographic_projection";
import distanceMagnitude from "./Tools/distance_magnitude";
import newCoFactor from "./Tools/new_cofactor";
import writeCurrentDecRa from "./Tools/write_current_dec_ra";
import DrawConstellations from "./Tools/draw_constellations";
import clearCanvas from "./Tools/clear_canvas";
import DrawStars from "./Tools/draw_stars";
import DrawIndicator from "./Tools/draw_indicator";
import MaxMagnitudeForFOV from "./Tools/max_magnitude_for_fov";
import Constellation_Opacity from "./Tools/constellation_opacity";
import Text_Opacity from "./Tools/text_opacity";

let fovAdjustTime;
let expectingDataUpdate = false;

/**
 * @typedef {Object} Props
 * @property {Array} starData - is an array of objects with form ['StarID', 'ProperName', 'RA', 'Dec', 'Mag', 'Spectrum']
 */

/**
 * @param {Props} props - Props for the Canvas component
 */
const Canvas = (props) => {
  const {
    width,
    height,
    starData,
    currentDecRa,
    changeDecRa,
    radiusCofactor,
    setCoFactor,
    fov,
    setFov,
    UpdateModalWithStarData,
    GeneralUpdate,
    activeStar,
    lockedOut,
    setLockOut,
    constellationsVisible,
    constellationsToggleTime,
    labelsVisibleTime,
    labelsVisible,
    ...rest
  } = props;

  let Fov = fov;
  let Ra = currentDecRa.RaCurrent;
  let Dec = currentDecRa.DecCurrent;
  let clickActive = false;
  let currentMousePosition = [0, 0]; // stores (x,y) coordinates as [x,y]
  let mouseDownPositionDecRa = [0, 0, 0, 0]; // stores (x,y) coordinates and Declination, Right Ascension at moment of mouse click
  let pinchCoords = [0, 0, 0, 0];
  let RadiusCoFactor = radiusCofactor; //scales the orthographic calculation results to fit neatly to the current screen proportions
  expectingDataUpdate = false; // back to false upon reinitialisation
  let fovHysteresis = 40; // units are ms, prevents race conditions between mouse wheel and data update
  let bgColour = "#020710"; // dark blue

  const draw = (ctx, frameCount) => {
    if (expectingDataUpdate && Date.now() > fovAdjustTime + fovHysteresis) {
      GeneralUpdate(
        Fov,
        Dec,
        Ra,
        RadiusCoFactor,
        window.innerWidth / 2,
        window.innerHeight / 2
      );
      setLockOut(true);
    }

    if (clickActive && !expectingDataUpdate && !lockedOut) {
      AdjustDecRa();
    }

    let radius =
      window.innerWidth >= window.innerHeight
        ? window.innerWidth
        : window.innerHeight; //will choose the longest dimension

    clearCanvas(canvasRef, bgColour);
    writeCurrentDecRa(canvasRef, Dec, Ra, 1, window.innerHeight - 25);
    DrawConstellations(
      canvasRef,
      Fov,
      Dec,
      Ra,
      radius,
      RadiusCoFactor,
      Constellation_Opacity(
        constellationsVisible,
        constellationsToggleTime,
        500
      ) // make this a called to consellationOpacity function
    );

    // Indicator
    if (activeStar) {
      DrawIndicator(
        canvasRef,
        activeStar,
        Fov,
        radius,
        RadiusCoFactor,
        Dec,
        Ra
      );
    }
    DrawStars(
      canvasRef,
      starData,
      radius,
      RadiusCoFactor,
      window.innerWidth,
      window.innerHeight,
      Fov,
      Dec,
      Ra,
      Text_Opacity(labelsVisible, labelsVisibleTime, 500)
    );
  };

  // UTILITIES FOR HTML EVENTS
  const canvasRef = useCanvas(draw);

  const handleClick = (e) => {
    if (lockedOut) {
      return;
    }
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    LookUpStarLocation(x, y);
  };

  const mousedowned = (e) => {
    if (lockedOut) {
      return;
    }
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseDownPositionDecRa = [x, y, Dec, Ra];
    clickActive = true;
  };

  const handleTouchStart = (event) => {
    const touches = event.touches;
    const rect = canvasRef.current.getBoundingClientRect();
    if (touches.length === 1) {
      const touch = touches[0];

      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      currentMousePosition = [x, y];
      mouseDownPositionDecRa = [x, y, Dec, Ra];
      //set current mouse position with touch event data
      clickActive = true;
    } else if (touches.length === 2) {
      const touch1 = touches[0];
      const touch2 = touches[1];
      const x1 = touch1.clientX - rect.left;
      const y1 = touch1.clientY - rect.top;
      const x2 = touch2.clientX - rect.left;
      const y2 = touch2.clientY - rect.top;

      pinchCoords = [x1, y1, x2, y2];
    }
  };

  const handleTouchEnd = (event) => {
    if (lockedOut) {
      return;
    }

    clickActive = false;
    changeDecRa(Dec, Ra);
  };

  const handleTouchMove = (event) => {
    // Get the touch points
    if (expectingDataUpdate && Date.now() > fovAdjustTime + fovHysteresis) {
      return;
    }
    const touches = event.touches;
    const rect = canvasRef.current.getBoundingClientRect();
    if (touches.length === 1) {
      const touch = touches[0];
      let [x, y] = [touch.clientX - rect.left, touch.clientY - rect.top];
      currentMousePosition = [x, y];
    } else if (touches.length === 2) {
      let [touch1, touch2] = touches;
      let [x1, y1] = [touch1.clientX - rect.left, touch1.clientY - rect.top];
      let [x2, y2] = [touch2.clientX - rect.left, touch2.clientY - rect.top];
      let currentLength = distanceMagnitude(x1, y1, x2, y2);
      let deltaLength = -currentLength + distanceMagnitude(...pinchCoords);

      if (Fov < 40) {
        Fov = 40;
      } else if (Fov > 180) {
        Fov = 180;
      } else {
        Fov += 0.02 * deltaLength;
      }

      RadiusCoFactor = newCoFactor(Fov); // this is not a react state change and does not trigger re-render
      fovAdjustTime = Date.now();
      expectingDataUpdate = true;
      changeDecRa(Dec, Ra);
    }
  };

  const mouseUpped = (e) => {
    if (lockedOut) {
      return;
    }

    clickActive = false;
    changeDecRa(Dec, Ra);
  };

  const currentMousePos = (e) => {
    if (lockedOut) {
      return;
    }
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    currentMousePosition = [x, y];
  };

  const mouseWheeled = (e) => {
    changeDecRa(Dec, Ra);
    if (lockedOut) {
      return;
    }

    if (expectingDataUpdate && Date.now() > fovAdjustTime + fovHysteresis) {
      return;
    }
    if (e.deltaY > 0 && Fov > 40) {
      // Min Fov is now 40 degrees
      Fov = Fov - 10;
      RadiusCoFactor = newCoFactor(Fov); // this is not a react state change and does not trigger re-render
      fovAdjustTime = Date.now();
      expectingDataUpdate = true;
    } else if (e.delta > 0 && Fov === 40) {
      return;
    } else if (e.deltaY < 0 && Fov < 180) {
      Fov = Fov + 10;
      RadiusCoFactor = newCoFactor(Fov); // this is not a react state change and does not trigger re-render
      fovAdjustTime = Date.now();
      expectingDataUpdate = true;
    }
  };

  const DoubleClick = () => {
    if (lockedOut) {
      return;
    }
    changeDecRa(Dec, Ra);
    setCoFactor(RadiusCoFactor);
    setFov(Fov);
  };

  // UTILITY CLASSES FOR USE BY THE CANVAS
  // Changes the Declination and Right Ascension setting of the canvas class according to mouse clicks and movements
  const AdjustDecRa = () => {
    if (lockedOut) {
      return;
    }

    if (currentMousePosition[0] === 0 && currentMousePosition[1] === 0) {
      // this fixes edge case where clicking in the same place twice without moving pointer causes bad stuff to happen
    } else {
      let relativeX =
        (0.5 * (mouseDownPositionDecRa[0] - currentMousePosition[0])) /
        window.innerWidth;
      let relativeY =
        (-0.5 * (mouseDownPositionDecRa[1] - currentMousePosition[1])) /
        window.innerHeight;

      if (
        // declination values are limited from 1.57 down to -1.57
        relativeY * Math.PI + mouseDownPositionDecRa[2] < 1.57 &&
        relativeY * Math.PI + mouseDownPositionDecRa[2] > -1.57
      ) {
        Dec = relativeY * Math.PI + mouseDownPositionDecRa[2];
      }

      Ra = -relativeX * Math.PI + mouseDownPositionDecRa[3];

      //confine Ra argument to 0 - 2Pi domain
      if (Ra > 2 * Math.PI) {
        Ra -= 2 * Math.PI;
      } else if (Ra < 0) {
        Ra += 2 * Math.PI;
      }
    }
  };

  // uses coordinates of mouse click to identify which star was clicked
  const LookUpStarLocation = (x, y) => {
    if (lockedOut) {
      return;
    }

    let objectLength = Object.keys(starData).length;
    let radius =
      window.innerWidth >= window.innerHeight
        ? window.innerWidth
        : window.innerHeight;

    for (let i = 0; i < objectLength; i++) {
      let coords = orthographicProjection(
        radius * RadiusCoFactor,
        Dec,
        Ra,
        starData[i][3], // starData obeys scheme: [['StarID', 'ProperName', 'RA', 'Dec', 'Mag', 'Spectrum']]
        starData[i][2]
      );

      if (
        distanceMagnitude(
          coords[0] + 0.5 * window.innerWidth,
          coords[1] + 0.5 * window.innerHeight,
          x,
          y
        ) < 10 &&
        MaxMagnitudeForFOV(Fov) > starData[i][4]
      ) {
        UpdateModalWithStarData(i);
        return;
      }
    }
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        {...rest}
        width={width}
        height={height}
        className="canvas"
        onClick={handleClick}
        onMouseDown={mousedowned}
        onMouseUp={mouseUpped}
        onMouseMove={currentMousePos}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={mouseWheeled}
        onDoubleClick={DoubleClick}
      />
    </>
  );
};

export default Canvas;