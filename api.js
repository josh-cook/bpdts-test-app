const fetch = require("node-fetch");
const geolib = require("geolib");

function getUsers(city = null) {
  const path = city ? `city/${city}/users` : "users";
  const url = `https://bpdts-test-app.herokuapp.com/${path}`;
  return fetch(url).then((response) => response.json());
}

function getUsersWithinRange(lat, long, distance) {
  return getUsers().then((users) => {
    return users.filter((user) => {
      const userLocation = {
        latitude: user.latitude,
        longitude: user.longitude,
      };

      const userDistance = geolib.getDistance(
        { latitude: lat, longitude: long },
        userLocation
      );

      const userDistanceMiles = geolib.convertDistance(userDistance, "mi");

      if (userDistanceMiles <= distance) {
        return true;
      }

      return false;
    });
  });
}

module.exports = { getUsers, getUsersWithinRange };
