import React, { useState, useEffect } from "react";
import Canvas from "./Canvas";
import Controls from "./Components/Controls";
import Modal from "./Components/Modal";
import Abriged_StarData from "./Data/Abriged_StarData";
import StarData from "./Data/StarData";

function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

function App({ isMobile }) {
  //STAR DATA FOR INITIAL FOV AND DEC/RA ARGUMENTS
  const firstStar = [
    "23440",
    "Sirius",
    1.7678185349912696,
    -0.2916993747538402,
    -1.44,
    "A0m...",
  ];
  const [starData, setStarData] = useState(firstStar); // initial data to create canvas with firstStar before api has responded
  const [activeStar, setActiveStar] = useState(false); // use this to store coords of active star with form [dec_RAD, ra_RAD]

  //VIEWPORT SETTINGS
  const [currentDecRa, setDecRa] = useState({
    DecCurrent: 1.57,
    RaCurrent: 0.7,
  });
  const [fov, setFov] = useState(180);
  const [radiusCofactor, setCoFactor] = useState(0.4);

  //MODAL WINDOW VARIABLES
  const [modalActive, setModal] = useState(false);
  const [modalMessage, setMessage] = useState("Click star for data");
  const [modalData, setModalData] = useState("No data available");

  //CONTROL VARIABLES
  const [lockedOut, setLockOut] = useState(false);
  const [constellationsToggleTime, setConstellationsToggleTime] = useState(0);
  const [constellationsVisible, setConstellationsVisible] = useState(true);
  const [labelsVisible, setLabelsVisible] = useState(true);
  const [labelsVisibleTime, setLabelsVisibleTime] = useState(0);

  const UpdateModalWithStarData = (starIndex) => {
    let dec_RAD = StarData[starIndex][8];
    let ra_RAD = StarData[starIndex][7];
    setActiveStar([dec_RAD, ra_RAD]);
    setMessage(
      ` ** [${dec_RAD}, ${ra_RAD}], // Constellation: ${StarData[starIndex][5]} `
    );
    let modalData = {
      properName: StarData[starIndex][6],
      hd: StarData[starIndex][2],
      hipparcos: StarData[starIndex][1],
      gliese: StarData[starIndex][4],
      absoluteMagnitude: StarData[starIndex][12],
      magnitude: StarData[starIndex][11],
      distanceLy: StarData[starIndex][9] * 3.26156,
      bayerFlamsteed: StarData[starIndex][5],
      spectrum: StarData[starIndex][13],
      raRad: ra_RAD,
      decRad: dec_RAD,
    };
    setModalData(modalData);
    setLockOut(false);
    setModal(true);
  };

  /**
   * GeneralUpdate updates the UI window with fov, dec, ra, data
   * @param {*} fov
   * @param {*} dec
   * @param {*} ra
   * @param {*} radiuscofactor
   */
  const GeneralUpdate = (fov, dec, ra, radiuscofactor) => {
    setFov(fov);
    setDecRa({ DecCurrent: dec, RaCurrent: ra });
    setCoFactor(radiuscofactor);
  };

  //CANVAS DIMENSIONSs
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const [centreCoords, setCurrentCentre] = useState({
    centreX: 0.5 * window.innerWidth,
    centreY: 0.5 * window.innerHeight,
  });

  useEffect(() => {
    setStarData(Abriged_StarData);
    setLockOut(false);
    setMessage(`done`);

    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({ height: window.innerHeight, width: window.innerWidth });
      setCurrentCentre({
        centreX: dimensions.width * 0.5,
        centreY: dimensions.height * 0.5,
      });
      setMessage(`fov: ${fov} `);
    }, 200);

    window.addEventListener("resize", debouncedHandleResize);

    //CLEAN UP FUNCTION
    return (_) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [
    centreCoords,
    dimensions,
    currentDecRa.DecCurrent,
    currentDecRa.RaCurrent,
    fov,
  ]);

  //HANDLER FUNCTIONS

  function handleModalClick() {
    setModal(false);
    setActiveStar(false);
  }

  function changeDecRa(dec, ra) {
    if (currentDecRa.DecCurrent === dec && currentDecRa.RaCurrent === ra) {
      return;
    }
    setDecRa({ DecCurrent: dec, RaCurrent: ra });
  }

  return (
    <>
      <Canvas
        width={dimensions.width}
        height={dimensions.height}
        starData={starData}
        currentDecRa={currentDecRa}
        changeDecRa={changeDecRa}
        radiusCofactor={radiusCofactor}
        fov={fov}
        setCoFactor={setCoFactor}
        setFov={setFov}
        UpdateModalWithStarData={UpdateModalWithStarData}
        GeneralUpdate={GeneralUpdate}
        activeStar={activeStar}
        lockedOut={lockedOut}
        setLockOut={setLockOut}
        constellationsVisible={constellationsVisible}
        constellationsToggleTime={constellationsToggleTime}
        labelsVisible={labelsVisible}
        labelsVisibleTime={labelsVisibleTime}
      />

      <Modal
        active={modalActive}
        handleModalClick={handleModalClick}
        message={modalMessage}
        modalData={modalData}
      />

      <Controls
        constellationsVisible={constellationsVisible}
        setConstellationsVisible={setConstellationsVisible}
        setConstellationsToggleTime={setConstellationsToggleTime}
        labelsVisible={labelsVisible}
        setLabelsVisible={setLabelsVisible}
        setLabelsVisibleTime={setLabelsVisibleTime}
      />
    </>
  );
}

export default App;
