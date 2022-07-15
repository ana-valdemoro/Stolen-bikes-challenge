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
  license_number: "::license_number::",
  bike_owner: {
    full_name: "::bike owner::",
    _id: new mongoose.Types.ObjectId(),
  },
};

describe("Stolen bike service test suite", () => {
  describe("Stolen bikes created when", () => {
    afterEach(async () => await clearDatabase());

    it("Has all required properties", async () => {
      await expect(stolenBikeService.create(mockStolenBike)).resolves;
    });

    it("Should be created without police_officer_id", async () => {
      const createdStolenBike = await stolenBikeService.create(mockStolenBike);

      expect(createdStolenBike).toHaveProperty("police_officer_id", undefined);
      expect(createdStolenBike).toHaveProperty("status", "UNASSIGNED");
    });

    it("bike owner can be repeated with a different license_number", async () => {
      let createdStolenBike = await stolenBikeService.create(mockStolenBike);
      let { license_number, ...mockStolenBike2 } = mockStolenBike;

      expect(createdStolenBike.license_number).toBe(
        mockStolenBike.license_number
      );
      expect(async () => {
        await stolenBikeService.create({
          ...mockStolenBike2,
          license_number: "::license_number2::",
        });
      }).not.toThrow();
    });
  });

  describe("Errors thrown when", () => {
    afterEach(async () => await clearDatabase());

    it("bike_owner is missing", async () => {
      const { bike_owner, ...mockStolenBikeWithoutBikeOwner } = mockStolenBike;
      expect(
        stolenBikeService.create(mockStolenBikeWithoutBikeOwner)
      ).rejects.toThrow();
    });

    it("police_officer_id is repeated", async () => {
      const bikeWithPolice = {
        ...mockStolenBike,
        police_officer_id: new mongoose.Types.ObjectId(),
      };

      let stolenBike = await stolenBikeService.create(bikeWithPolice);
      let stolenBikeWithDuplictedPoliceOfficer;

      try {
        stolenBikeWithDuplictedPoliceOfficer = await stolenBikeService.create({
          ...bikeWithPolice,
          license_number: "::license_number2::",
        });
      } catch (error) {
        const duplicatedField = Object.keys(error.keyValue)[0];
        expect(error.code).toBe(11000);
        expect(duplicatedField).toBe("police_officer_id");
      }
      expect(stolenBike.police_officer_id).toBe(
        bikeWithPolice.police_officer_id
      );
      expect(stolenBikeWithDuplictedPoliceOfficer).toBe(undefined);
    });

    it("license_number is repeated", async () => {
      await stolenBikeService.create(mockStolenBike);
      let secondStolenBike;
      try {
        secondStolenBike = await stolenBikeService.create(mockStolenBike);
      } catch (error) {
        const duplicatedField = Object.keys(error.keyValue)[0];
        expect(error.code).toBe(11000);
        expect(duplicatedField).toBe("license_number");
      }

      expect(secondStolenBike).toBe(undefined);
    });
  });
});

describe("Get One Unssigned Bike", () => {
  afterEach(async () => await clearDatabase());

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

describe("Get one by ID", () => {
  afterEach(async () => await clearDatabase());

  let mockToBeFound;
  beforeEach(
    async () => (mockToBeFound = await stolenBikeService.create(mockStolenBike))
  );

  it("Should return null if not found", async () => {
    const stolenBike = await stolenBikeService.getByID(
      mongoose.Types.ObjectId()
    );

    expect(stolenBike).toBeNull();
  });

  it("Should return correct stolen bike if Id matches", async () => {
    const stolenBike = await stolenBikeService.getByID(mockToBeFound._id);

    expect(stolenBike._id).toEqual(mockToBeFound._id);
  });
});
