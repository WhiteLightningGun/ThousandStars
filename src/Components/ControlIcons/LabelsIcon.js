import { React } from "react";
import "../css/labelicon.css";

const LabelsIcon = ({ onClick, visible }) => {
  // 4.438739776611328 is path length of upperline and lowerline

  return (
    <svg
      onClick={onClick}
      width="27.091467mm"
      height="27.091465mm"
      viewBox="0 0 27.091467 27.091465"
      version="1.1"
      id="svg1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Labels</title>
      <defs id="defs1" />
      <g id="layer2" transform="translate(-42.819503,0.4154725)">
        <rect
          style={{
            display: "inline",
            fill: "#1a1a1a",
            stroke: "#333333",
            strokeWidth: 1,
            strokeMiterlimit: 3.5,
            paintOrder: "markers fill stroke",
          }}
          id="rect1-4"
          width="26.091465"
          height="26.091465"
          x="43.319504"
          y="0.0845275"
        />
        <g id="label_group" style={{ display: "inline" }}>
          <path
            style={{
              display: "inline",
              fill: "none",
              stroke: "#f9f9f9",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "miter",
              strokeMiterlimit: "3.5",
              paintOrder: "fill markers stroke",
            }}
            d="m 53.86166,17.431909 3.184983,-3.09165"
            id={visible ? "lowerline" : "unlowerline"}
          />
          <path
            style={{
              display: "inline",
              fill: "none",
              stroke: "#f9f9f9",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "miter",
              strokeMiterlimit: "3.5",
              paintOrder: "fill markers stroke",
            }}
            d="m 51.988522,15.58658 3.184983,-3.09165"
            id={visible ? "upperline" : "unupperline"}
          />
          <circle
            style={{
              fill: "none",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "miter",
              strokeMiterlimit: "3.5",
              paintOrder: "fill markers stroke",
            }}
            id={visible ? "label_tag" : "label_tag_hide"}
            cx="60.386581"
            cy="9.1074848"
            r="2.0105407"
          />
          <path
            style={{
              display: "inline",
              fill: "none",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "miter",
              strokeMiterlimit: "3.5",
              paintOrder: "fill markers stroke",
            }}
            d="M 47.869768,15.108246 58.373975,4.6040388 h 6.517481 l -3e-6,6.5174792 -10.504207,10.504206 z"
            id={visible ? "label_tag" : "label_tag_hide"}
          />
        </g>
      </g>
    </svg>
  );
};

export default LabelsIcon;
