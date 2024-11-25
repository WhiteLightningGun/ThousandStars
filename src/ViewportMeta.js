import { useEffect } from "react";

const ViewportMeta = () => {
  useEffect(() => {
    const setViewportMeta = () => {
      let viewportMeta = document.querySelector('meta[name="viewport"]');
      if (!viewportMeta) {
        viewportMeta = document.createElement("meta");
        viewportMeta.name = "viewport";
        document.head.appendChild(viewportMeta);
      }
      viewportMeta.content =
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
    };

    const preventZoom = (event) => {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    };

    setViewportMeta();
    document.addEventListener("touchstart", preventZoom, { passive: false });
    document.addEventListener("touchmove", preventZoom, { passive: false });

    return () => {
      document.removeEventListener("touchstart", preventZoom);
      document.removeEventListener("touchmove", preventZoom);
    };
  }, []);

  return null;
};

export default ViewportMeta;
