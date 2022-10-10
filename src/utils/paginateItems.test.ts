import { paginateItems } from "./paginateItems";

describe("Paginate items testing ...", () => {
  test("Should return 1 page with 3 limit and next page", () => {
    const result = paginateItems(users)(1, 3);
    expect(result).toStrictEqual(firstPageResult);
  });

  test("Should return 2 page with 3 limit and next, previous page", () => {
    const result = paginateItems(users)(2, 3);
    expect(result).toStrictEqual(secondPageResult);
  });
});

const secondPageResult = {
  next: { page: 3, limit: 3 },
  previous: { page: 1, limit: 3 },
  results: [
    {
      username: "dfvhnghn",
      role: "admin",
    },
    {
      username: "dfvdfvdfv",
      role: "admin",
    },
    {
      username: "32653030",
      role: "admin",
    },
  ],
};

const firstPageResult = {
  next: { page: 2, limit: 3 },
  results: [
    { username: "Maksudkhanov", role: "admin" },
    { username: "asdasd", role: "dfvdfv" },
    { username: "fgklbml", role: "admin" },
  ],
};

const users = [
  {
    username: "Maksudkhanov",
    role: "admin",
  },
  {
    username: "asdasd",
    role: "dfvdfv",
  },

  {
    username: "fgklbml",
    role: "admin",
  },

  {
    username: "dfvhnghn",
    role: "admin",
  },
  {
    username: "dfvdfvdfv",
    role: "admin",
  },
  {
    username: "32653030",
    role: "admin",
  },
  {
    username: "wefwef",
    role: "admin",
  },
  {
    username: "23r2r",
    role: "admin",
  },
];
