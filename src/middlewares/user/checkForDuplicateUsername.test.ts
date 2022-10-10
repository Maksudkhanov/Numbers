import { NextFunction, Request, Response } from "express";
import { MockUserService } from "../../controllers/auth.test";
import { IUserService } from "../../interfaces/services/userService";
import { errorMessages } from "../../shared/responseMessages/errorMessages";
import { checkForDuplicateUsername } from "./checkForDuplicateUsername";

describe("CheckForDuplicateUsername middleware testing ...", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();
  let mockUserService: IUserService;

  beforeEach(() => {
    mockRequest = {
      body: {
        username: "Maksudkhanov",
      },
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn(),
    };
    mockUserService = new MockUserService();
  });

  test("Username exists, status 400", async () => {
    jest
      .spyOn(mockUserService, "getOneUserByUsername")
      .mockImplementation(() => Promise.resolve(mockRequest.body));

    await checkForDuplicateUsername(mockUserService)(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.json).toBeCalledWith(errorMessages.userUsernameExists);
    expect(mockResponse.status).toBeCalledWith(400);
  });

  test("Server error status 500", async () => {
    jest
      .spyOn(mockUserService, "getOneUserByUsername")
      .mockImplementation(() => Promise.reject());

    await checkForDuplicateUsername(mockUserService)(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toBeCalledWith(500);
  });
});
