import { NextFunction, Request, Response } from "express";
import { errorMessages } from "../../shared/responseMessages/errorMessages";
import { authCheckMiddleware } from "./authCheck";

describe("Authorization middleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn(),
    };
  });

  test("Calling next fn", async () => {
    mockRequest = {
      method: "OPTIONS",
      headers: {
        authorization: "Bearer TOKEN",
      },
    };
    authCheckMiddleware(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(nextFunction).toBeCalledTimes(1);
  });

  test("Without TOKEN", async () => {
    authCheckMiddleware(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.json).toBeCalledWith(errorMessages.userAuth);
    expect(mockResponse.status).toBeCalledWith(403);
  });
});
