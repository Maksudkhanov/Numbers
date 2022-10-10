import { NextFunction, Request, Response } from "express";
import { errorMessages } from "../../shared/responseMessages/errorMessages";
import { validateNumberFields } from "./validateNumberFields";

describe("ValidateNumberFields", () => {
  let mockResponse: Partial<Response>;
  let mockRequest: Partial<Request>;
  let nextFunction: NextFunction = jest.fn();

  beforeAll(() => {
    mockResponse = {
      json: jest.fn(),
      status: jest.fn(),
    };
  });

  beforeEach(() => {
    mockRequest = {
      body: {
        id: 41,
        value: "+55 84 91234-4321",
        monthyPrice: "0.03",
        setupPrice: "3.40",
        currency: "U$",
      },
    };

    jest.clearAllMocks();
  });

  test("id is negative", () => {
    mockRequest.body.id = -5;

    validateNumberFields(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.json).toBeCalledWith(errorMessages.numberIdIsInteger);
    expect(mockResponse.status).toBeCalledWith(400);
  });

  test("Value is not phoneNumber", () => {
    mockRequest.body.value = "string";

    validateNumberFields(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.json).toBeCalledWith(
      errorMessages.numberValueIsPhoneNumber
    );
    expect(mockResponse.status).toBeCalledWith(400);
  });

  test("MonthyPrice is not number", () => {
    mockRequest.body.monthyPrice = "string";

    validateNumberFields(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.json).toBeCalledWith(
      errorMessages.numberMonthyPriceIsNumber
    );
    expect(mockResponse.status).toBeCalledWith(400);
  });

  test("SetupPrice is not number", () => {
    mockRequest.body.setupPrice = "string";

    validateNumberFields(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.json).toBeCalledWith(
      errorMessages.numberSetupPriceIsNumber
    );
    expect(mockResponse.status).toBeCalledWith(400);
  });

  test("SetupPrice is negative", () => {
    mockRequest.body.setupPrice = -5;

    validateNumberFields(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.json).toBeCalledWith(
      errorMessages.numberSetupPriceIsNotNegative
    );
    expect(mockResponse.status).toBeCalledWith(400);
  });

  test("MonthyPrice is negative", () => {
    mockRequest.body.monthyPrice = -5;

    validateNumberFields(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.json).toBeCalledWith(
      errorMessages.numberMonthyPriceIsNotNegative
    );
    expect(mockResponse.status).toBeCalledWith(400);
  });
});
