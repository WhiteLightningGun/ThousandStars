import { React } from "react";
import "./css/controls.css";
import ConstellationsIcon from "./ControlIcons/ConstellationsIcon";

const Controls = ({
  constellationsVisible,
  setConstellationsVisible,
  setConstellationsToggleTime,
}) => {
  const toggleSwitch = () => {
    console.log("toggle switch");
    setConstellationsVisible(!constellationsVisible);
    setConstellationsToggleTime(Date.now());
  };

  return (
    // Make this some sort of container
    <div className="controls">
      <div className="iconholder">
        <ConstellationsIcon
          onClick={toggleSwitch}
          visible={constellationsVisible}
        />
      </div>
    </div>
  );
};

export default Controls;
