function Text_Opacity(labelsVisible, toggleTime, transitionTime = 1000) {
  if (!toggleTime) return "FF"; // default colour (fully opaque)

  const currentTime = Date.now();
  const timeSinceToggle = currentTime - toggleTime;
  const opacity = labelsVisible
    ? Math.min(1, timeSinceToggle / transitionTime)
    : Math.max(0, 1 - timeSinceToggle / transitionTime);

  return convertToHex(opacity);
}

function convertToHex(value) {
  let hexValue = Math.round(Math.max(0, Math.min(1, value)) * 255).toString(16);
  return hexValue.padStart(2, "0");
}

export default Text_Opacity;
