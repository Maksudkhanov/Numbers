export const errorMessages = {
  numberCreate: {
    msg: "Error creating Number",
    errCode: 1000,
  },
  numberUpdate: {
    msg: "Eror updating Number",
    errCode: 1001,
  },
  numberDelete: {
    msg: "Error deleting Number",
    errCode: 1002,
  },
  numberGet: {
    msg: "Error getting Number",
    errCode: 1003,
  },
  numbersGet: {
    msg: "Error getting All Numbers",
    errCode: 1004,
  },
  userCreate: {
    msg: "Error creating User",
    errCode: 1005,
  },
  userGet: {
    msg: "Error getting User",
    errCode: 1006,
  },
  userAuth: {
    msg: "User not authorized",
    errCode: 1007,
  },
  userUsernameExists: {
    msg: "Username is already taken",
    errCode: 1008,
  },
  numberValueExists: {
    msg: "Value is already taken",
    errCode: 1009,
  },
  numberIdIsInteger: {
    msg: "Number's id should be integer",
    errCode: 1010,
  },
  numberValueIsPhoneNumber: {
    msg: "Number's value should be phonenumber",
    errCode: 1011,
  },
  numberMonthyPriceIsNumber: {
    msg: "Number's monthPrice should be number",
    errCode: 1012,
  },
  numberSetupPriceIsNumber: {
    msg: "Number's setupPrice should be number",
    errCode: 1013,
  },
  numberSetupPriceIsNotNegative: {
    msg: "Number's setupPrice should not be negative ",
    errCode: 1014,
  },
  numberMonthyPriceIsNotNegative: {
    msg: "Number's monthyPrice should not be negative",
    errCode: 1015,
  },
  numberUpdateFields: {
    msg: "Only monthyPrice and setupPrice can be updated",
    errCode: 1016,
  },
  userIncorrectPassword: {
    msg: "Incorrect password",
    errCode: 1017,
  },
  userAuthFields: {
    msg: "Need username, password, role fields",
    errCode: 1018,
  },
  userUsernameIsEmpty: {
    msg: "Username should not be empty",
    errCode: 1019,
  },
  userPasswordIsEmpty: {
    msg: "Password should not be empty",
    errCode: 1020,
  },
  userRoleIsEmpty: {
    msg: "Role should not be empty",
    errCode: 1021,
  },
  userAllowedRoles: {
    msg: "No such role",
    errCode: 1022,
  },
  numberDuplicateId: {
    msg: "Id is already taken",
    errCode: 1023,
  },
  numberUpdateFieldsIsEmpty: {
    msg: "fieldsToUpdate should contain at least monthyPrice or setupPrice",
    errCode: 1024,
  },
};
