export function DrawMoonPhase(
  ctx,
  coords,
  windowWidth,
  windowHeight,
  radius,
  color,
  phase,
  limb
) {
  //**
  // save entire state of context such as it exists before all the
  // context wide effects are applied such as translation and rotation - important
  // n.b. phase angle appears to only be limited to 0 - PI, can't use it to determine which side of moon is facing sun
  // **/
  //console.log(`dmp: limb = ${limb}`);
  ctx.save();
  //establish some required variables
  let centerX = coords[0] + 0.5 * windowWidth;
  let centerY = coords[1] + 0.5 * windowHeight;
  let scaleX = Math.cos(phase); // negative scaleX corresponds to newest Moon i.e. first quarter, positive value is beyond the centre heading

  ctx.strokeStyle = "#00000000";
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.lineWidth = 1;
  //draw underlying flat disc
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();

  // begin drawing overlays
  // first semi circle, used for masking purposes

  ctx.fillStyle = moonShadow;
  ctx.strokeStyle = color;

  // begin rotations
  ctx.translate(centerX, centerY);
  let rotationFactor = limb > Math.PI ? Math.PI : 0;
  //rotationFactor = limb < Math.PI ? 0 : Math.PI;
  ctx.rotate(rotationFactor); // make rotation argument correspond to a vector that points to the sun's current position on the viewer
  ctx.translate(-centerX, -centerY);

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius + 0, -Math.PI / 2, 0.5 * Math.PI);
  ctx.fill();

  // bowed half
  ctx.fillStyle = scaleX < 0 ? moonShadow : color; // bowed half switches to moon colour when scaleX is greater than 0 and illumination > 50%

  ctx.scale(scaleX, 1); // scaling argument affects apparent position of object?

  // Draw the scaled bowed circle
  //ctx.translate(centerX, centerY);
  ctx.beginPath();
  ctx.arc(
    (1 / scaleX) * centerX,
    centerY,
    radius + 0,
    -Math.PI / 2,
    0.5 * Math.PI
  );
  ctx.fill();
  // draw line through center of moon to remove aliasing
  // experiment with drawing an empty semi-circle later
  ctx.beginPath();
  ctx.strokeStyle = scaleX < 0 ? moonShadow : color;
  ctx.lineWidth = 7;
  ctx.moveTo((1 / scaleX) * centerX, centerY + radius - 1);
  ctx.lineTo((1 / scaleX) * centerX, centerY - radius - 0);
  ctx.stroke();

  //ctx.translate(-centerX, -centerY);
  // Restore the original context state
  ctx.restore();
}

// phase ranges from -180 to 180 degrees

const moonShadow = "#020812";
