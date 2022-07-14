import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import authRouter from "./api/auth/auth.router";
import stolenBikesRouter from "./api/stolenBike/stolenBike.router";
import departmentRouter from "./api/deparment/department.router";
import policeOfficerRouter from "./api/policeOfficer/policeOfficer.router";
import { authorizeHeader } from "../utils/middleware/jwt";
import config from "../config/index";
import { swaggerSpec } from "../config/swagger";

const router = Router();
const baseRoute = "/";

if (config.env !== "production") {
  router.use(
    `${baseRoute}api-docs`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
  );
}

router.use(`${baseRoute}auth`, authRouter);

router.use(`${baseRoute}stolen-bikes`, authorizeHeader, stolenBikesRouter);
router.use(`${baseRoute}departments`, authorizeHeader, departmentRouter);
router.use(`${baseRoute}police-officers`, authorizeHeader, policeOfficerRouter);

export default router;
