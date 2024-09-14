import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import captchaRouter from "./routes/captcha.js";

const startServer = async (serverPort) => {
    const app = express();

    app.use(bodyParser.json());
    app.use(morgan("dev"))
    
    app.use("/captcha", captchaRouter);
    
    app.listen(serverPort, () => {
        console.log(`Server listening on port ${serverPort}`);
    });
}

export default startServer;
