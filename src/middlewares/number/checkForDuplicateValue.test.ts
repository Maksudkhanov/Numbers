import { NextFunction, Request, Response } from "express";
import { MockNumberService } from "../../controllers/api.test";
import { INumberService } from "../../interfaces/services/numberService";
import { errorMessages } from "../../shared/responseMessages/errorMessages";
import { checkForDuplicateValue } from './checkForDuplicateValue';

describe("CheckForDuplicateValue testing ...", () => {
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

  test("Duplicated value", async () => {
    const number = {
      id: 42,
      value: "+55 84 91234-4321",
      monthyPrice: "0.03",
      setupPrice: "3.40",
      currency: "U$",
    };

    jest
      .spyOn(mockNumberService, "getOneNumberByValue")
      .mockImplementation(() => Promise.resolve(number));

    await checkForDuplicateValue(mockNumberService)(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.json).toBeCalledWith(errorMessages.numberValueExists);
    expect(mockResponse.status).toBeCalledWith(400);
  });

  test("Server error", async () => {
    jest
      .spyOn(mockNumberService, "getOneNumberByValue")
      .mockImplementation(() => Promise.reject());

    await checkForDuplicateValue(mockNumberService)(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toBeCalledWith(500);
  });
});
