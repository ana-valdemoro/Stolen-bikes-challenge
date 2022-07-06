import mongoose from "mongoose";
import policeOfficerService from "../features/api/policeOfficer/policeOfficer.service";
import stolenBikeService from "../features/api/stolenBike/stolenBike.service";

let changeStream;

export function createPoliceObserver() {
  // open a Change Stream
  const policeOfficeCollection =
    mongoose.connection.collection("policesofficers");

  const options = { fullDocument: "updateLookup" };
  changeStream = policeOfficeCollection.watch({ status: "FREE" }, options);

  // set up a listener when change events are emitted
  changeStream.on("change", async (next) => {
    // process any change event
    console.log(
      "Recibidio un cambio dentro de police officer collection \t",
      next
    );

    let status;
    const { operationType } = next;
    if (operationType === "update") {
      status = next.updateDescription.updatedFields.status;

      if (status === "BUSY") {
        return;
      }
    } else if (operationType === "insert") {
      const { fullDocument: policeOfficer } = next;
      //Get one stolen bike case
      const unassignedBike = await stolenBikeService.listUnsignedBike();

      if (unassignedBike) {
        const updatedBike = stolenBikeService.update(unassignedBike._id, {
          status: "IN PROCESS",
          police_id: policeOfficer._id,
        });

        if (updatedBike) {
          console.log("Se ha podido asignar una bicicleta a un policia");
          // cambair estado del policia
          await policeOfficerService.update(policeOfficer._id, {
            status: "BUSY",
          });
        }
      }
    }

    // DO NOTHING
  });

  return { changeStream, onDelete: () => changeStream.close() };
}
