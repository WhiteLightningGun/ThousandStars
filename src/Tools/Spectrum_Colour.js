/**
 * Sets the colour of a star based on its spectrum code
 */

function GetStarColour(code = "A") {
  const COLOUR = {
    T: "#4D3344",
    L: "#D9BFC8",
    M: "#FADBD4",
    K: "#FFD0AF",
    G: "#FFF8CE",
    F: "#FAFFE4",
    A: "#eef6f4",
    B: "#F3F8FA",
    O: "#ffffff",
    C: "#8c8873",
    S: "#c0f0a8",
    W: "#c0f0a8",
    N: "#c0f0a8",
  };
  return COLOUR[code[0]] || "#FFFFFF"; // Default color is white
}

export default GetStarColour;
