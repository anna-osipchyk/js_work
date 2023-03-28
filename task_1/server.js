//that's a simple pure node js server
const USERS = require("./users.json");
const http = require("http");
const url = require("url");
const getUsers = require("./controllers.js");
const hostname = "127.0.0.1";
const port = 3000;
const users = [...USERS];

const server = http.createServer((request, response) => {
  let sendResponse = (data, status_code) => {
    response.writeHead(status_code, { "Content-Type": "application/json" });
    response.write(JSON.stringify(data));
    response.end();
  };
  if (request.method === "GET") {
    let requestUrl = url.parse(request.url, true);

    if (requestUrl.pathname === "/users/") {
      try {
        let resp = getUsers(requestUrl.query, users);

        if (resp.length === 0) {
          sendResponse(
            "User data does not match the search and filter criteria",
            404
          );
        } else {
          sendResponse(resp, 200);
        }
      } catch (err) {
        sendResponse(err.message, 422);
      }
    }
  }
});

server.listen(port, hostname, () =>
  console.log(`Server is running on port ${port} and host ${hostname}`)
);
