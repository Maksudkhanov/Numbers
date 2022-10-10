import { NextFunction, Request, Response } from "express";
import { UserRoles } from "../../interfaces/entities/user";
import { errorMessages } from "../../shared/responseMessages/errorMessages";
import { validateAuthFields } from "./validateAuthFields";

describe("ValidateAuthFields middleware testing ...", () => {
  let mockResponse: Partial<Response>;
  let mockRequest: Partial<Request>;
  let nextFunction: NextFunction = jest.fn();

  beforeAll(() => {
    mockRequest = {
      body: {},
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn(),
    };
  });

  test("Missing password field", () => {
    mockRequest.body = {
      username: "Maksudkhanov",
      role: UserRoles.ADMIN,
    };
    validateAuthFields(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.json).toBeCalledWith(errorMessages.userAuthFields);
    expect(mockResponse.status).toBeCalledWith(400);
  });

  test("Empty username field", () => {
    mockRequest.body = {
      username: "",
      password: "admin",
      role: UserRoles.ADMIN,
    };
    validateAuthFields(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.json).toBeCalledWith(errorMessages.userUsernameIsEmpty);
    expect(mockResponse.status).toBeCalledWith(400);
  });

  test("Empty password field", () => {
    mockRequest.body = {
      username: "Maksudkhanov",
      password: "",
      role: UserRoles.ADMIN,
    };
    validateAuthFields(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.json).toBeCalledWith(errorMessages.userPasswordIsEmpty);
    expect(mockResponse.status).toBeCalledWith(400);
  });

  test("Empty role field", () => {
    mockRequest.body = {
      username: "Maksudkhanov",
      password: "admin",
      role: "",
    };
    validateAuthFields(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.json).toBeCalledWith(errorMessages.userRoleIsEmpty);
    expect(mockResponse.status).toBeCalledWith(400);
  });

  test("Not allowed role", () => {
    mockRequest.body = {
      username: "Maksudkhanov",
      password: "admin",
      role: "asd",
    };
    validateAuthFields(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.json).toBeCalledWith(errorMessages.userAllowedRoles);
    expect(mockResponse.status).toBeCalledWith(400);
  });
});
