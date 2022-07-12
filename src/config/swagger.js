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
  basePath: "/api/v1",
};
let pathToCheck = path.join(__dirname, "/../docs/**/*.yml");
console.log(pathToCheck);
const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, "/../docs/**/*.yml")],
};

export const swaggerSpec = swaggerJSDoc(options);
