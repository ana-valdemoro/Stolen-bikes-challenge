import "dotenv/config";
import fs from "fs";

const privateKey = fs.readFileSync(`${__dirname}/certs/private.key`);
const publicKey = fs.readFileSync(`${__dirname}/certs/public.key`);

export default {
  env: process.env.NODE_ENV || "development",
  port: process.env.NODE_PORT || 4000,
  jwt: {
    privateKey,
    publicKey,
    expiresIn: process.env.JWT_EXPIRESIN || 3600,
  },
  mongo: {
    init: process.env.DB_INIT || true,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    port: process.env.DB_PORT,
    dir: `../${process.env.DB_MODEL}`,
  },
  pagination: {
    pageSize: 10,
    maxPageSize: 100,
  },
};
