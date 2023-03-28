const chai = require("chai");
const assert = require("chai").assert;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const host = "http://127.0.0.1:3000";

describe("Test the functionality of Express node js server", () => {
  it("GET users with type === 'manager'", () => {
    chai
      .request(host)
      .get("/users/")
      .query({ type: "manager" })
      .end((error, response1) => {
        assert.equal(response1.status, 200);
        assert.equal(response1.body.length, 2);
      });
  });

  it("GET all users", () => {
    chai
      .request(host)
      .get("/users/")
      .end((error, response1) => {
        assert.equal(response1.status, 200);
        assert.equal(response1.body.length, 9);
      });
  });

  it("GET users with min & max age", () => {
    chai
      .request(host)
      .get("/users/")
      .query({ minAge: 16, maxAge: 25 })
      .end((error, response1) => {
        assert.equal(response1.status, 200);
        assert.equal(response1.body.length, 5);
      });
  });

  it("GET users with that will return []", () => {
    chai
      .request(host)
      .get("/users/")
      .query({ minAge: 50, maxAge: 75 })
      .end((error, response1) => {
        assert.equal(response1.status, 404);
        assert.equal(
          response1.text,
          "User data does not match the search and filter criteria"
        );
      });
  });

  it("GET users with maxAge lower then minAge", () => {
    chai
      .request(host)
      .get("/users/")
      .query({ minAge: 20, maxAge: 19 })
      .end((error, response1) => {
        assert.equal(response1.status, 422);
        assert.equal(response1.text, "Invalid parameters");
      });
  });

  it("GET users with invalid maxAge || minAge", () => {
    chai
      .request(host)
      .get("/users/")
      .query({ minAge: -23 })
      .end((error, response1) => {
        assert.equal(response1.status, 422);
        assert.equal(response1.text, "Invalid parameters");
      });

    chai
      .request(host)
      .get("/users/")
      .query({ minAge: 10 })
      .end((error, response2) => {
        assert.equal(response2.status, 422);
        assert.equal(response2.text, "Invalid parameters");
      });

    chai
      .request(host)
      .get("/users/")
      .query({ minAge: "str" })
      .end((error, response3) => {
        assert.equal(response3.status, 422);
        assert.equal(response3.text, "Invalid parameters");
      });

    chai
      .request(host)
      .get("/users/")
      .query({ maxAge: -9 })
      .end((error, response4) => {
        assert.equal(response4.status, 422);
        assert.equal(response4.text, "Invalid parameters");
      });

    chai
      .request(host)
      .get("/users/")
      .query({ maxAge: 101 })
      .end((error, response5) => {
        assert.equal(response5.status, 422);
        assert.equal(response5.text, "Invalid parameters");
      });

    chai
      .request(host)
      .get("/users/")
      .query({ maxAge: "str" })
      .end((error, response6) => {
        assert.equal(response6.status, 422);
        assert.equal(response6.text, "Invalid parameters");
      });
  });

  it("GET users with invalid limit", () => {
    chai
      .request(host)
      .get("/users/")
      .query({ limit: "str" })
      .end((error, response1) => {
        assert.equal(response1.status, 422);
        assert.equal(response1.text, "Invalid parameters");
      });
    chai
      .request(host)
      .get("/users/")
      .query({ limit: -2 })
      .end((error, response2) => {
        assert.equal(response2.status, 422);
        assert.equal(response2.text, "Invalid parameters");
      });
  });
});
