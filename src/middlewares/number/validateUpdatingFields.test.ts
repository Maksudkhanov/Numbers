import { NextFunction, Request, Response } from "express";
import { errorMessages } from "../../shared/responseMessages/errorMessages";
import { validateUpdatingFieldsNumber } from "./validateUpdatingFieldsNumber";

describe("ValidateUpdatingFields testing ...", () => {
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
        fieldsToUpdate: {
          monthyPrice: "4",
          setupPrice: "5",
        },
      },
    };

    jest.clearAllMocks();
  });

  test("Empty updateFields", () => {
    mockRequest.body.fieldsToUpdate = undefined;

    validateUpdatingFieldsNumber(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.json).toBeCalledWith(
      errorMessages.numberUpdateFieldsIsEmpty
    );
    expect(mockResponse.status).toBeCalledWith(400);
  });

  test("Another fields in updateFields", () => {
    mockRequest.body.fieldsToUpdate.currency = "$$";

    validateUpdatingFieldsNumber(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.json).toBeCalledWith(errorMessages.numberUpdateFields);
    expect(mockResponse.status).toBeCalledWith(400);
  });

  test("MonthyPrice is not number", () => {
    mockRequest.body.fieldsToUpdate.monthyPrice = "string";

    validateUpdatingFieldsNumber(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.json).toBeCalledWith(
      errorMessages.numberMonthyPriceIsNumber
    );
    expect(mockResponse.status).toBeCalledWith(400);
  });

  test("MonthyPrice is negative", () => {
    mockRequest.body.fieldsToUpdate.monthyPrice = -5;

    validateUpdatingFieldsNumber(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.json).toBeCalledWith(
      errorMessages.numberMonthyPriceIsNotNegative
    );
    expect(mockResponse.status).toBeCalledWith(400);
  });

  test("SetupPrice is not number", () => {
    mockRequest.body.fieldsToUpdate.setupPrice = "string";

    validateUpdatingFieldsNumber(
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
    mockRequest.body.fieldsToUpdate.setupPrice = -5;

    validateUpdatingFieldsNumber(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.json).toBeCalledWith(
      errorMessages.numberSetupPriceIsNotNegative
    );
    expect(mockResponse.status).toBeCalledWith(400);
  });
});
