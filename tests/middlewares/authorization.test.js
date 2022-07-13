import {
  BIKE_OWNER,
  DIRECTOR,
  POLICE_OFFICER,
} from "../../src/features/api/role/role.service";
import { hasPermissions } from "../../src/utils/middleware/authorization";

jest.mock("@hapi/boom", () => ({
  forbidden: jest.fn().mockReturnValue(new Error(`My mocked error message`)),
}));

describe("hasPermissions middleware", () => {
  let mockRequest;
  let mockResponse;
  let nextFunction = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  //   beforeEach(() => {
  //     mockResponse = {
  //       json: jest.fn(),
  //     };
  //   });

  it("Should continue inside the app if user has director role", async () => {
    const role = { name: DIRECTOR };
    mockRequest = { user: { role } };

    hasPermissions(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).toHaveBeenCalledTimes(1);
    expect(nextFunction).toHaveBeenCalledWith();
  });

  it("Should continue inside the app if user has police officer role", async () => {
    const role = { name: POLICE_OFFICER };
    mockRequest = { user: { role } };

    hasPermissions(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).toHaveBeenCalledTimes(1);
    expect(nextFunction).toHaveBeenCalledWith();
  });

  it("Shouldn't allow access if user has any differente role", async () => {
    const role = { name: BIKE_OWNER };
    mockRequest = {
      user: { role, full_name: "bike owner" },
      baseUrl: "/esto-es-una-prueba",
      url: "/",
    };

    hasPermissions(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).toHaveBeenCalledTimes(1);
    expect(nextFunction).toHaveBeenCalledWith(
      new Error("My mocked error message")
    );
  });
});
