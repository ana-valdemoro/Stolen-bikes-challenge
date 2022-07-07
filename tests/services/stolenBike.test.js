import mongoose from "mongoose";
import { connectDatabase, clearDatabase, closeDatabase } from "../db-handler";
import stolenBikeService from "../../src/features/api/stolenBike/stolenBike.service";

beforeAll(async () => await connectDatabase());

afterAll(async () => await closeDatabase());

afterEach(async () => await clearDatabase());
/**
 *  Unit test suite of StolenBike
 */

describe("Stolen bike service test suite", () => {
  describe("Create", () => {
    const stolenBikeData = {
      color: "yellow",
      date: "2022-04-07",
      thief_description: "A weird man with a red hood",
      address: "Cordoba stree",
      type: "Montana",
      license_number: "123243242",
    };

    it("Should be created correctly", async () => {
      expect(async () => {
        await stolenBikeService.create(stolenBikeData);
      }).not.toThrow();
    });

    it("Should be created without police_id and default status", async () => {
      const createdStolenBike = await stolenBikeService.create(stolenBikeData);

      expect(createdStolenBike).toHaveProperty("police_id", undefined);
      expect(createdStolenBike).toHaveProperty("status", "UNASSIGNED");
    });
  });

  //   describe("GetOneUnssignedBike", () => {

  //     it.only("Should return null when can not find any unassigened stolen bike", () => {
  //         // await stolenBikeService.create(stolenBikeData);
  //         const stolenBike = await stolenBikeService.getOneUnsignedBike();

  //         expect(stolenBike).not.toBeNull();

  //     });
  //   });
});
