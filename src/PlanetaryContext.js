import React, { createContext, useEffect, useRef } from "react";
import { GetPlanetaryPositions } from "./Data/PlanetaryData";

export const PlanetaryContext = createContext();

export const PlanetsProvider = ({ children }) => {
  const planetsDataRef = useRef({
    marsPosition: null,
    jupiterPosition: null,
  });

  useEffect(() => {
    const updatePlanetaryPositions = () => {
      const date = new Date();
      let result = GetPlanetaryPositions(date);

      planetsDataRef.current = result;
    };

    updatePlanetaryPositions();

    const intervalId = setInterval(updatePlanetaryPositions, 60000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <PlanetaryContext.Provider value={planetsDataRef}>
      {children}
    </PlanetaryContext.Provider>
  );
};
