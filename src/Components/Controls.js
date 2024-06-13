import { React } from "react";
import "./css/controls.css";
import ConstellationsIcon from "./ControlIcons/ConstellationsIcon";
import LabelsIcon from "./ControlIcons/LabelsIcon";

const Controls = ({
  constellationsVisible,
  setConstellationsVisible,
  setConstellationsToggleTime,
  labelsVisible,
  setLabelsVisible,
  setLabelsVisibleTime,
}) => {
  const constellationToggleSwitch = () => {
    setConstellationsVisible(!constellationsVisible);
    setConstellationsToggleTime(Date.now());
  };

  const labelsToggleSwitch = () => {
    console.log("labels toggle switch");
    setLabelsVisible(!labelsVisible);
    setLabelsVisibleTime(Date.now());
  };

  return (
    // Make this some sort of container
    <div className="controls">
      <div className="iconholder">
        <ConstellationsIcon
          onClick={constellationToggleSwitch}
          visible={constellationsVisible}
        />
        <LabelsIcon onClick={labelsToggleSwitch} visible={labelsVisible} />
      </div>
    </div>
  );
};

export default Controls;
