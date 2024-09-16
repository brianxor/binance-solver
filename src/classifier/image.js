import { RawImage } from "@xenova/transformers";

const processImage = async (url) => {
  const squareSize = 110;

  try {
    const image = await RawImage.fromURL(url);

    let croppedImages = [];

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const xMin = col * squareSize;
        const yMin = row * squareSize;
        const xMax = xMin + squareSize - 1;
        const yMax = yMin + squareSize - 1;

        const croppedImage = await image.crop([xMin, yMin, xMax, yMax]);

        croppedImages.push(croppedImage);
      }
    }

    return croppedImages;
  } catch (err) {
    return err;
  }
};
export { processImage };
