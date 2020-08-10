const { deduplicateUsers } = require("./user.js");

it.each([
  {
    users: [],
    expected: [],
  },
  {
    users: [{ id: 1 }],
    expected: [{ id: 1 }],
  },
  {
    users: [{ id: 1 }, { id: 2 }],
    expected: [{ id: 1 }, { id: 2 }],
  },
  {
    users: [{ id: 1 }, { id: 2 }, { id: 1 }, { id: 2 }],
    expected: [{ id: 1 }, { id: 2 }],
  },
])("Deduplicates users correctly", ({ users, expected }) => {
  expect(deduplicateUsers(users)).toEqual(expected);
});
