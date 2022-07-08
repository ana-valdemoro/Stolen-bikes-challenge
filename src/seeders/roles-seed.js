import { v4 as uuidv4 } from "uuid";
import db from "../config/db";
import { models } from "../models/index";

// Stablish database connection
db.connect();
const roles = [
  {
    uuid: uuidv4(),
    name: "Police Director Department",
    permissions: "DIRECTOR",
    deleted: false,
  },
  {
    uuid: uuidv4(),
    name: "Police Officer",
    permissions: "POLICE_OFFICER",
    deleted: false,
  },
  {
    uuid: uuidv4(),
    name: "Bike Owner",
    permissions: "BIKE_OWNER",
    deleted: false,
  },
];

const seedDB = async () => {
  await models.Role.deleteMany({});
  await models.Role.insertMany(roles);
};

// Seed the database and close database connection
seedDB().then(() => {
  db.disconnect();
});
