import mongoose from "mongoose";
import { connectDatabase, clearDatabase, closeDatabase } from "../db-handler";
import stolenBikeService from "../../src/features/api/stolenBike/stolenBike.service";

beforeAll(async () => await connectDatabase());

afterAll(async () => await closeDatabase());

afterEach(async () => await clearDatabase());
/**
 *  Unit test suite of StolenBike
 */
const mockStolenBike = {
  color: "::color::",
  date: "2034-05-02",
  thief_description: "::description::",
  address: "::address::",
  type: "::type::",
  license_number: "::license Number::",
  bike_owner: {
    full_name: "::bike owner::",
    uuid: "aanfadfuisfyhsd7fsd8f",
  },
};

describe("Stolen bike service test suite", () => {
  describe("Stolen bikes created when", () => {
    it("Has all required properties", async () => {
      expect(async () => {
        await stolenBikeService.create(mockStolenBike);
      }).not.toThrow();
    });

    it("Should be created without police_id and default status", async () => {
      const createdStolenBike = await stolenBikeService.create(mockStolenBike);

      expect(createdStolenBike).toHaveProperty("police_id", undefined);
      expect(createdStolenBike).toHaveProperty("status", "UNASSIGNED");
    });
  });

  describe("Errors thrown when", () => {
    it("bike_owner is missing", async () => {
      const { bike_owner, ...bike } = mockStolenBike;
      await expect(stolenBikeService.create(bike)).rejects.toThrow();
    });

    it("police_id is repeated", async () => {
      const bikeWithPolice = {
        ...mockStolenBike,
        police_id: new mongoose.Types.ObjectId(),
      };
      await stolenBikeService.create(bikeWithPolice);
      await expect(stolenBikeService.create(bikeWithPolice)).rejects.toThrow();
    });
  });
});

describe("Get One Unssigned Bike", () => {
  it("Should return null when can not find any unassigened stolen bike", async () => {
    const stolenBike = await stolenBikeService.getOneUnsignedBike();

    expect(stolenBike).toBeNull();
  });

  it("Should return an unassigned stolen bike", async () => {
    await stolenBikeService.create(mockStolenBike);
    const stolenBike = await stolenBikeService.getOneUnsignedBike();

    expect(stolenBike).toHaveProperty("status", "UNASSIGNED");
  });
});
