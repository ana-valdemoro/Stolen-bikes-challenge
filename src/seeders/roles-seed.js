import db from "../config/db";
import {
  BIKE_OWNER,
  DIRECTOR,
  POLICE_OFFICER,
} from "../features/api/role/role.service";
import { Role } from "../models/index";

// Stablish database connection
db.connect();
const roles = [
  {
    name: DIRECTOR,
  },
  {
    name: POLICE_OFFICER,
  },
  {
    name: BIKE_OWNER,
  },
];

const seedDB = async () => {
  await Role.deleteMany({});
  await Role.insertMany(roles);
};

// Seed the database and close database connection
seedDB().then(() => {
  db.disconnect();
});
