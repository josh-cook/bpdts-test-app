require("jest-fetch-mock").enableFetchMocks();
const api = require("./api.js");
const users = require("./users.json");
const usersInLondon = require("./usersInLondon.json");

it("Correctly returns users", () => {
  fetch.mockResponse((req) => {
    if (req.url === "https://bpdts-test-app.herokuapp.com/users") {
      return Promise.resolve(JSON.stringify(users));
    }
    return Promise.reject(new Error("Bad URL"));
  });
  return expect(api.getUsers()).resolves.toEqual(users);
});

it("Correctly returns users by city", () => {
  fetch.mockResponse((req) => {
    if (req.url === "https://bpdts-test-app.herokuapp.com/city/London/users") {
      return Promise.resolve(JSON.stringify(usersInLondon));
    }
    return Promise.reject(new Error("Bad URL"));
  });
  return expect(api.getUsers("London")).resolves.toEqual(usersInLondon);
});

it("Correctly returns users within range of a city", () => {
  fetch.mockResponse((req) => {
    const london = { latitude: 51.509865, longitude: -0.118092 };
    if (req.url === "https://bpdts-test-app.herokuapp.com/users") {
      return Promise.resolve(JSON.stringify(users));
    }
    return Promise.reject(new Error("Bad URL"));
  });
  return expect(
    api.getUsersWithinRange(51.509865, -0.118092, 50)
  ).resolves.toEqual([
    {
      email: "agarnsworthy7d@seattletimes.com",
      first_name: "Ancell",
      id: 266,
      ip_address: "67.4.69.137",
      last_name: "Garnsworthy",
      latitude: 51.6553959,
      longitude: 0.0572553,
    },
    {
      email: "hlynd8x@merriam-webster.com",
      first_name: "Hugo",
      id: 322,
      ip_address: "109.0.153.166",
      last_name: "Lynd",
      latitude: 51.6710832,
      longitude: 0.8078532,
    },
    {
      email: "phebbsfd@umn.edu",
      first_name: "Phyllys",
      id: 554,
      ip_address: "100.89.186.13",
      last_name: "Hebbs",
      latitude: 51.5489435,
      longitude: 0.3860497,
    },
  ]);
});
