import mongoose from "mongoose";
import config from "./index";
import logger from "./winston";

const env = process.env.NODE_ENV || "development";

const options = {
  dbName: config.mongo.database,
  maxPoolSize: 5,
};

const connect = async () => {
  const { database, pass, user } = config.mongo;
  const url = `mongodb+srv://${user}:${pass}@cluster0.ndylh.mongodb.net/?retryWrites=true&w=majority&maxPoolSize=5`;
  try {
    await mongoose.connect(url, options);
    logger.info("Connection to mongoose works");
  } catch (err) {
    logger.error(`Error al conectarse a la BD: ${database}`, {
      err: err.message,
    });
  }
};

const disconnect = () => {
  mongoose.connection.close();
};

mongoose.connection.on("disconnected", () => logger.silly("disconnected"));
mongoose.connection.on("connected", () => logger.silly("connected"));
mongoose.connection.on("connecting", () => logger.silly("connecting"));
mongoose.connection.on("disconnecting", () => logger.silly("disconnecting"));

export default { disconnect, connect };
