

const { TestWatcher } = require("jest");
const request = require("supertest");
const app = require("../app.js");
const allTestData = require("../db/data/test-data/index.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");

beforeEach(() => seed(allTestData));
afterAll(() => db.end());

describe("/api/users", () => {
  test("200: responds with an array of users", () => {
    return request(app).get("/api/users").expect(200);
  });
});
