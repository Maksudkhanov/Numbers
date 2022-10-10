import { NextFunction, Request, Response } from "express";
import { MockNumberService } from "../../controllers/api.test";
import { INumberService } from "../../interfaces/services/numberService";
import { errorMessages } from "../../shared/responseMessages/errorMessages";
import { isNumberExists } from "./isNumberExists";

describe("isNumberExists testing ...", () => {
  let mockResponse: Partial<Response>;
  let mockRequest: Partial<Request>;
  let nextFunction: NextFunction = jest.fn();
  let mockNumberService: INumberService;

  beforeAll(() => {
    mockNumberService = new MockNumberService();
    mockRequest = {
      body: {},
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn(),
    };
  });

  test("Number does not exist", async () => {
    mockRequest.body = { id: 41 };

    jest
      .spyOn(mockNumberService, "getOneNumber")
      .mockImplementation(() => Promise.resolve(null));

    await isNumberExists(mockNumberService)(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.json).toBeCalledWith(errorMessages.numberNoId);
    expect(mockResponse.status).toBeCalledWith(404);
  });

  test("Server error", async () => {
    jest
      .spyOn(mockNumberService, "getOneNumber")
      .mockImplementation(() => Promise.reject());

    await isNumberExists(mockNumberService)(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toBeCalledWith(500);
  });
});
