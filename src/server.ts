import http from "http";
import app from "./app/app";
import config from "./app/config/index";
import mongoose from "mongoose";

const server = http.createServer(app);

async function databaseOn(uri: string) {
  return mongoose.connect(uri);
}

databaseOn(config.database_url as string).then(() => {
  server.listen(config.port, () => console.log(`server listening port is ${config.port}`))
});