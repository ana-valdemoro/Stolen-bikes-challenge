import db from "../config/db";
import { Role } from "../models/index";

// Stablish database connection
db.connect();
const roles = [
  {
    name: "Police Director Department",
    permissions: "DIRECTOR",
  },
  {
    name: "Police Officer",
    permissions: "POLICE_OFFICER",
  },
  {
    name: "Bike Owner",
    permissions: "BIKE_OWNER",
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
