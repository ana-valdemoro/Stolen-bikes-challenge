import mongoose from "mongoose";
import logger from "../config/winston";
import policeOfficerService from "../features/api/policeOfficer/policeOfficer.service";
import stolenBikeService from "../features/api/stolenBike/stolenBike.service";

const changePoliceOfficerStatusToBusy = async (policeOfficerId) => {
  try {
    await policeOfficerService.update(policeOfficerId, {
      status: "BUSY",
    });
  } catch (error) {
    logger.error(error);
  }
};
const obtainAnStolenBike = async () => {
  let unassignedBike;
  try {
    unassignedBike = await stolenBikeService.getOneUnsignedBike();
  } catch (error) {
    logger.error(error);
    return null;
  }

  return unassignedBike;
};
const assignPoliceOfficerToStolenBike = async (policeOfficerId, stolenBikeId) => {
  let updatedBike;
  try {
    updatedBike = await stolenBikeService.update(stolenBikeId, {
      status: "IN PROCESS",
      police_officer_id: policeOfficerId,
    });
  } catch (error) {
    logger.error(error);
    return null;
  }
  return updatedBike;
};
const listenerController = async (policeOfficerId) => {
  const unassignedBike = await obtainAnStolenBike();

  if (!unassignedBike) {
    return;
  }

  const assignedStolenBike = await assignPoliceOfficerToStolenBike(
    policeOfficerId,
    unassignedBike._id,
  );

  if (!assignedStolenBike) {
    return;
  }

  await changePoliceOfficerStatusToBusy(policeOfficerId);
};
const assesPoliceOfficerChanges = (next) => {
  // set up a listener when change events are emitted

  const { operationType } = next;

  if (operationType === "update") {
    const { status } = next.updateDescription.updatedFields;

    if (status === "BUSY") {
      return;
    }
    const { documentKey: policeOfficer } = next;

    listenerController(policeOfficer._id);
  } else if (operationType === "insert") {
    const { fullDocument: policeOfficer } = next;

    listenerController(policeOfficer._id);
  }
};

export default function solveStolenBikeListener() {
  // open a Change Stream
  const policeOfficeCollection = mongoose.connection.collection("policeofficers");

  const options = { fullDocument: "updateLookup" };
  const changeStream = policeOfficeCollection.watch({ status: "FREE" }, options);
  // Register to posible changes in policeOfficer collection
  changeStream.on("change", assesPoliceOfficerChanges);

  return { changeStream, onDelete: () => changeStream.close() };
}
