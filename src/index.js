import dotenv from "dotenv";
import startServer from "./server/server.js";

dotenv.config();

const serverPort = process.env.SERVER_PORT || 3000;

await startServer(serverPort);