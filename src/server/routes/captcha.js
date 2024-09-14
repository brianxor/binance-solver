import express from "express";
import buildPayload from "../../payload/payload.js";

const router = express.Router();

const supportedModes = ["PAYLOAD"];

router.post("/solve", async (req, res) => {
  const { mode, bizId, captchaData } = req.body;

  if (!mode || !bizId || !captchaData) {
    return res.status(500).json({
      ok: false,
      error: "missing body fields"
    })
  };

  if (!supportedModes.includes(mode)) {
    return res.status(500).json({
      ok: false,
      error: "mode not supported"
    })
  }
  
  const { sig, salt, path2, ek, captchaType, tag } = captchaData;

  if (!sig || !salt || !path2 || !ek || !captchaType || !tag) {
    return res.status(500).json({
      ok: false,
      error: "invalid captcha data",
    });
  };

  if (captchaType !== "BOX") {
    return res.status(500).json({
      ok: false,
      error: "captcha type not supported",
    });
  }

  try {
    const startTime = Date.now();

    const payload = await buildPayload(bizId, captchaData);

    const endTime = (Date.now() - startTime) / 1000;
    
    res.status(200).json({
      ok: true,
      solution: {
        payload: payload.encodedPayload,
        s: payload.s,
        answer: payload.answer
      },
      solveTime: endTime,
    });
    
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: "couldn't solve captcha",
    });
  }
});

export default router;
