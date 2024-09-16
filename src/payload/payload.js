import classifier from "../classifier/classifier.js";
import * as utils from "./utils.js";
import generateEvents from "./events.js";

const buildPayload = async (bizId, captchaData) => {

  const { sig, salt, path2, ek, tag } = captchaData;

  const { width, height } = getScreenData();

  const eventsCount = utils.randomIntBetween(40, 130);
  const eventsList = generateEvents(eventsCount, width, height);
  
  const answer = await classifier.classify(path2, tag);

  const payload = {
    ev: {
      wd: getWd(),
      im: getIm(),
      de: getDe(),
      prde: getPrde(),
      brla: getBrla(),
      pl: getPl(),
      wiinhe: height,
      wiouhe: height.toString(),
    },
    be: {
      ec: {
        mm: eventsCount,
        md: 0,
        mu: 0,
        cl: 0,
      },
      el: eventsList,
    },
    dist: answer,
  };
  const encodedPayload = encodeURIComponent(utils.encodePayload(JSON.stringify(payload), ek));

  const s = utils.calculateAsciiSum(bizId + sig + encodedPayload + salt);

  return {
    encodedPayload,
    s,
    answer
  };
};
const getWd = () => {
  return utils.randomOddInt();
};

const getIm = () => {
  return utils.randomOddInt();
};

const getDe = () => {
  return "";
};

const getPrde = () => {
  let values = [];

  for (let i = 0; i < 4; i++) {
    const randomInt = utils.randomOddInt();
    values.push(randomInt);
  }

  return values.join(",");
};

const getBrla = () => {
  return utils.randomOddInt();
};

const getPl = () => {
  return "Win32";
};

const getScreenData = () => {
  return {
    width: 1920,
    height: 1080,
  };
};

export default buildPayload;
