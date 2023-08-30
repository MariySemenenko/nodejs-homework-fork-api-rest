require("dotenv").config();

const supertest = require("supertest");
const mongoose = require("mongoose");
const { app } = require("./app");
const { User } = require("./models/user");

mongoose.set("strictQuery", false);

const { DB_TEST_URI } = process.env;

describe("register", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_TEST_URI);

    // await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.disconnect(DB_TEST_URI);
  });

  it("should register new user", async () => {
    const response = await supertest(app).post("/register").send({
      email: "testUser@gmail.com",
      password: "789456",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.data.user.email).toBe("testUser@gmail.com");
  });

  it("should not register the same user two times", async () => {
    await supertest(app).post("/register").send({
      email: "testUser@gmail.com",
      password: "789456",
    });

    const response = await supertest(app).post("/register").send({
      email: "testUser@gmail.com",
      password: "789456",
    });
    expect(response.statusCode).toBe(409);
  });
});
