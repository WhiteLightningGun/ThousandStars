import React, { createContext, useEffect, useRef } from "react";
import { GetLunarData } from "./Data/LunarData";

export const LunarContext = createContext();

export const LunarProvider = ({ children }) => {
  const lunarDataRef = useRef({
    lunarPosition: null,
    lunarPhase: null,
  });

  useEffect(() => {
    const updateLunarData = () => {
      const date = new Date();
      let result = GetLunarData(date);

      lunarDataRef.current = result;
    };

    updateLunarData();

    const intervalId = setInterval(updateLunarData, 60000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <LunarContext.Provider value={lunarDataRef}>
      {children}
    </LunarContext.Provider>
  );
};
