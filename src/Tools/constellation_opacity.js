/**
 * Performs quick calculations based on time since last update to determine the opacity of the constellation lines.
 * @param {*} constellationsVisible designed to use constellationsVisible from App.js, a state variable that is updated when the user toggles the visibility of the constellations in Controls.js
 * @param {*} toggleTime - designed to use constellationsToggleTime from App.js, a state variable that is updated when the user toggles the visibility of the constellations
 * @param {*} transitionTime - in ms, default is 1000ms
 * @returns
 */
function Constellation_Opacity(
  constellationsVisible,
  toggleTime,
  transitionTime = 1000
) {
  if (!toggleTime) return "#343742FF"; // default colour (fully opaque)

  let timeSinceToggle = Date.now() - toggleTime;
  let opacity = 0;
  if (constellationsVisible) {
    opacity = Math.min(1, timeSinceToggle / transitionTime);
  } else {
    opacity = Math.max(0, 1 - timeSinceToggle / transitionTime);
  }

  return "#343742" + convertToHex(opacity);
}

function convertToHex(value) {
  value = Math.max(0, Math.min(1, value));

  let scaledValue = Math.round(value * 255);

  let hexValue = scaledValue.toString(16);

  if (hexValue.length < 2) {
    hexValue = "0" + hexValue;
  }

  return hexValue;
}

export default Constellation_Opacity;
