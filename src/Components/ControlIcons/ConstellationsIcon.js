import React from "react";
import "../css/constellationicon.css";

const ConstellationsIcon = ({ onClick, visible }) => {
  return (
    <svg
      onClick={onClick}
      width="27.091467mm"
      height="27.091467mm"
      viewBox="0 0 27.091467 27.091467"
      version="1.1"
      id="svg1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Constellations</title>
      <defs id="defs1"></defs>
      <g id="layer1" transform="translate(-80.076578,-141.97987)">
        <rect
          style={{
            fill: "#1a1a1a",
            stroke: "#333333",
            strokeWidth: 1,
            strokeMiterlimit: 3.5,
            paintOrder: "markers fill stroke",
          }}
          id="rect1"
          width="26.091465"
          height="26.091465"
          x="80.576584"
          y="142.47987"
        />
        <circle
          style={{
            fill: "#ffffff",
            stroke: "none",
            strokeWidth: 1,
            strokeMiterlimit: 3.5,
            paintOrder: "markers fill stroke",
          }}
          id={visible ? "circleDraw" : "circleUndraw"}
          cx="93.391243"
          cy="149.42862"
          r="2.5161388"
        />
        <circle
          style={{
            fill: "#ffffff",
            stroke: "none",
            strokeWidth: 1,
            strokeMiterlimit: 3.5,
            paintOrder: "markers fill stroke",
          }}
          id={visible ? "circleDraw" : "circleUndraw"}
          cx="100.73703"
          cy="160.79164"
          r="2.5161388"
        />
        <circle
          style={{
            fill: "#ffffff",
            stroke: "none",
            strokeWidth: 1,
            strokeMiterlimit: 3.5,
            paintOrder: "markers fill stroke",
          }}
          id={visible ? "circleDraw" : "circleUndraw"}
          cx="86.045456"
          cy="160.79164"
          r="2.5161388"
        />
        <path
          style={{
            stroke: "none",
            strokeWidth: 1,
            strokeMiterlimit: 3.5,
            paintOrder: "markers fill stroke",
            strokeLinecap: "round", // Add this line
          }}
          d="m 93.391243,149.42862 7.345787,11.36302"
          id={visible ? "crossbar" : "unCrossbar"}
        />
        <path
          style={{
            stroke: "none",
            strokeWidth: 1,
            strokeMiterlimit: 3.5,
            paintOrder: "markers fill stroke",
            strokeLinecap: "round", // Add this line
          }}
          d="m 86.045454,160.79164 7.345789,-11.36302"
          id={visible ? "crossbar" : "unCrossbar"}
        />
        <path
          style={{
            stroke: "none",
            strokeWidth: 1,
            strokeMiterlimit: 3.5,
            paintOrder: "markers fill stroke",
            strokeLinecap: "round", // Add this line
          }}
          d="m 100.73703,160.79164 -13.530417,-0.0812"
          id={visible ? "crossbar" : "unCrossbar"}
        />
      </g>
    </svg>
  );
};

export default ConstellationsIcon;
