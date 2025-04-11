import ServerlessHttp from "serverless-http";
import app from "../src/app.js";

export const handler = ServerlessHttp(app);