const express = require("express");
const api = require("./api.js");
const { deduplicateUsers } = require("./user.js");
const app = express();

app.get("/users/around-london", (req, res) => {
  const london = { latitude: 51.509865, longitude: -0.118092 };

  Promise.all([
    api.getUsersWithinRange(london.latitude, london.longitude, 50),
    api.getUsers("London"),
  ]).then(([usersWithinRange, users]) => {
    const deduplicatedUsers = deduplicateUsers(usersWithinRange.concat(users));
    res.json(deduplicatedUsers);
  });
});

app.listen(3000);
