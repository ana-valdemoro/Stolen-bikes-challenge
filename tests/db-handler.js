import { connect, connection } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import logger from "../src/config/winston";

let mongod;

/**
 * Connect to the in-memory database.
 */

export const connectDatabase = async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
  };

  connect(uri, mongooseOpts);
};

/**
 * Drop database, close the connection and stop mongod.
 */
export const closeDatabase = async () => {
  await connection.dropDatabase();
  await connection.close();
  await mongod.stop();
};

/**
 * Remove all the data for all db collections.
 */
export const clearDatabase = async () => {
  const collections = connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    try {
      collection.deleteMany();
    } catch (error) {
      logger.error(error);
    }
  }
};
