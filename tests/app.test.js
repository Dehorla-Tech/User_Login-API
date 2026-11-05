import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../server.js";

describe("User Login API", () => {
  it("should return a successful response from the home endpoint", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("should confirm that the health endpoint is working", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("should return 404 for an unknown endpoint", async () => {
    const response = await request(app).get("/unknown");

    expect(response.status).toBe(404);
  });

  it("should reject login when credentials are missing", async () => {
    const response = await request(app)
      .post("/login")
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});