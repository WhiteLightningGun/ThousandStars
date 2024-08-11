import React from "react";
import "./css/modal.css";

function Modal({ active, handleModalClick, message, modalData }) {
  let cssVisibilityControl = false;
  const searchTerm =
    modalData.properName === "N/A"
      ? "HD " + modalData.hd
      : modalData.properName;
  const wikipediaSearchUrl = `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(
    searchTerm
  )}&go=Go`;

  if (active === true) {
    cssVisibilityControl = "modal-content-show";
  } else {
    cssVisibilityControl = "modal-content-hide";
  }

  return (
    <div className={cssVisibilityControl}>
      <div className="modal-header">
        {modalData.properName === "N/A" ? (
          <>
            <div className="modal-header-title">
              <h1>HD {modalData.hd}</h1>{" "}
              <span className="close" onClick={handleModalClick}>
                &times;
              </span>
            </div>
            <h4>
              Hp: {modalData.hipparcos}, Gl: {modalData.gliese}
            </h4>
          </>
        ) : (
          <>
            <div className="modal-header-title">
              <h1>{modalData.properName}</h1>{" "}
              <span className="close" onClick={handleModalClick}>
                &times;
              </span>
            </div>
            <h4>
              Hd: {modalData.hd}, Hp: {modalData.hipparcos}, Gl:{" "}
              {modalData.gliese}
            </h4>
          </>
        )}{" "}
      </div>
      <div className="modal-body">
        <p>{/*message*/}</p>
      </div>
      <div className="modal-data">
        <table>
          <tbody>
            <tr>
              <td className="modal-row-header">Absolute Magnitude</td>
              <td>{modalData.absoluteMagnitude}</td>
            </tr>
            <tr>
              <td className="modal-row-header">Apparent Magnitude</td>
              <td>{modalData.magnitude}</td>
            </tr>
            <tr>
              <td className="modal-row-header">Distance</td>
              <td>{Math.round(modalData.distanceLy * 100) / 100} LY</td>
            </tr>
            <tr>
              <td className="modal-row-header">Bayer Flamsteed</td>
              <td>{modalData.bayerFlamsteed}</td>
            </tr>
            <tr>
              <td className="modal-row-header">Spectrum</td>
              <td>{modalData.spectrum}</td>
            </tr>
            <tr>
              <td className="modal-row-header">Ra/Dec</td>
              <td>
                {(
                  Math.round(((modalData.raRad * (180 / Math.PI)) / 15) * 100) /
                  100
                ).toFixed(2)}{" "}
                h /{" "}
                {(
                  Math.round(modalData.decRad * (180 / Math.PI) * 100) / 100
                ).toFixed(2)}
                &nbsp;°
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="modal-link">
        <p>
          <a
            href={wikipediaSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Search Wikipedia for {searchTerm}
          </a>
        </p>
      </div>
    </div>
  );
}

export default Modal;
