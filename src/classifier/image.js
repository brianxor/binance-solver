import { RawImage } from "@xenova/transformers";

const processImage = async (url) => {
  const squareSize = 110;

  try {
    const image = await RawImage.fromURL(url);

    let croppedImages = [];

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const x_min = col * squareSize;
        const y_min = row * squareSize;
        const x_max = x_min + squareSize - 1;
        const y_max = y_min + squareSize - 1;

        const croppedImage = await image.crop([x_min, y_min, x_max, y_max]);

        croppedImages.push(croppedImage);
      }
    }

    return croppedImages;
  } catch (err) {
    return err;
  }
};
export { processImage };
