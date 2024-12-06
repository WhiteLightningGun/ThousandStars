import loadImageFromBase64 from "./load_image_base64";
import { PLANET_IMAGES } from "../images/planets/planet_images";

const planetImages = {};

const preloadImages = async (imageList) => {
  const promises = imageList.map(async ({ name, base64 }) => {
    try {
      const img = await loadImageFromBase64(base64);
      planetImages[name] = img;
    } catch (err) {
      console.error(`Failed to load image for ${name}`, err);
    }
  });

  await Promise.all(promises);
};

preloadImages(PLANET_IMAGES);

export function GetPlanetImage(name) {
  return planetImages[name];
}
