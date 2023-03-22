//that's a node js server using Express framework
const express = require("express");
const USERS = require("./users.json");
const utils = require("./utils");
const getUsers = require("./utils.js");
const hostname = "127.0.0.1";
const port = 3000;
const users = [...USERS];

const app = express();

app.get("/users/", (request, response) => {
  try {
    let resp = getUsers(request.query, users);

    if (resp.length == 0) {
      response
        .status(404)
        .send("User data does not match the search and filter criteria");
    } else {
      response.status(200).send(resp);
    }
  } catch (err) {
    response.status(422).send(err.message);
    console.log(err);
  }
});

app.listen(port, () =>
  console.log(
    "Express server is running on port " + port + " and host " + hostname
  )
);
