import mongoose from "mongoose";
import logger from "../config/winston";
import policeOfficerService from "../features/api/policeOfficer/policeOfficer.service";
import stolenBikeService from "../features/api/stolenBike/stolenBike.service";

export function createPoliceListener() {
  // open a Change Stream
  const policeOfficeCollection =
    mongoose.connection.collection("policeofficers");

  const options = { fullDocument: "updateLookup" };
  const changeStream = policeOfficeCollection.watch(
    { status: "FREE" },
    options
  );

  changeStream.on("change", setUpPoliceListener);

  return { changeStream, onDelete: () => changeStream.close() };
}

const setUpPoliceListener = (next) => {
  // set up a listener when change events are emitted
  console.log(
    "Recibidio un cambio dentro de police officer collection \t",
    next
  );

  const { operationType } = next;

  if (operationType === "update") {
    const status = next.updateDescription.updatedFields.status;

    if (status === "BUSY") {
      return;
    }
    const { documentKey: policeOfficer } = next;
    logger.info("Deberiamos asignar al policia");

    listenerController(policeOfficer._id);
  } else if (operationType === "insert") {
    const { fullDocument: policeOfficer } = next;

    listenerController(policeOfficer._id);
  }
};

const listenerController = async (policeOfficerId) => {
  //Get one stolen bike case
  let unassignedBike;
  try {
    unassignedBike = await stolenBikeService.getOneUnsignedBike();
  } catch (error) {
    logger.error(error);
    return;
  }
  console.log("mi biici sin asignar", unassignedBike);

  if (unassignedBike) {
    let updatedBike;
    try {
      updatedBike = await stolenBikeService.update(unassignedBike._id, {
        status: "IN PROCESS",
        police_id: policeOfficerId,
      });
    } catch (error) {
      logger.error(error);
      return;
    }

    if (updatedBike) {
      console.log("Se ha podido asignar una bicicleta a un policia");

      try {
        await policeOfficerService.update(policeOfficerId, {
          status: "BUSY",
        });
      } catch (error) {
        logger.error(error);
      }
    }
  }
};
