import { processImage } from "./image.js";

class Classifier {
  constructor(task, model, labels) {
    this.task = task;
    this.model = model;
    this.labels = labels;
  }

  static instance = null;
  static captchaBaseUrl = "https://bin.bnbstatic.com"

  async classify(imageUrlPath, label) {
    let captchaSplit = imageUrlPath.split(",");
    
    let isMultipleCaptcha = false;

    if (captchaSplit.length === 2) {
      isMultipleCaptcha = true;
    }

    const instance = await this.getInstance();
    const processedImage = await processImage(Classifier.captchaBaseUrl + captchaSplit[0]);
    const scores = await instance(processedImage, this.labels);
    
    let answers = this.findAnswers(scores, label).join("-");
    
    if (isMultipleCaptcha) {
      const processedImage = await processImage(Classifier.captchaBaseUrl + captchaSplit[1]);
      const scores = await instance(processedImage, this.labels);
      const secondAnswers = this.findAnswers(scores, label).join("-");
      answers += "," + secondAnswers
    }

    return answers
  }

  async getInstance(progress_callback = null) {
    if (Classifier.instance === null) {
      let { pipeline } = await import("@xenova/transformers");
      Classifier.instance = await pipeline(this.task, this.model, {
        progress_callback,
      });
    }

    return Classifier.instance;
  }

  findAnswers(scores, label) {
    let answers = [];

    scores.forEach((score, answer) => {
      if (score[0].label === label) {
        answers.push(answer);
      }
    });
    
    return answers;
  }
}

const task = "zero-shot-image-classification";
const model = "Xenova/clip-vit-large-patch14";

const labels = [
  "airplane",
  "bicycle",
  "bus",
  "car",
  "dog",
  "panda",
  "ship",
  "elephant",
];

export default new Classifier(task, model, labels);
