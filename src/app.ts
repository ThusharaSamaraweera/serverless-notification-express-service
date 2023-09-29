import express from "express";
import ServerlessHttp from "serverless-http";

import routes from "./routes";

const app = express();
app.use(express.json());

app.use('/', routes)
export const handler = ServerlessHttp(app);