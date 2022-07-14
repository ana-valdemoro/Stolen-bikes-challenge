import { version, name } from "../../package.json";
import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: name,
    version,
  },
  servers: [{ url: "http://localhost:4000" }],
  basePath: "/",
};
const options = {
  swaggerDefinition,
  apis: [
    path.join(__dirname, "/../docs/**/*.js"),
    path.join(__dirname, "/../docs/**/*.yml"),
    path.join(__dirname, "/../docs/**/*.yaml"),
  ],
};

export const swaggerSpec = swaggerJSDoc(options);
