function Text_Opacity(labelsVisible, toggleTime, transitionTime = 1000) {
  if (!toggleTime) return "FF"; // default colour (fully opaque)

  let timeSinceToggle = Date.now() - toggleTime;
  let opacity = 0;
  if (labelsVisible) {
    opacity = Math.min(1, timeSinceToggle / transitionTime);
  } else {
    opacity = Math.max(0, 1 - timeSinceToggle / transitionTime);
  }

  return convertToHex(opacity);
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

export default Text_Opacity;
