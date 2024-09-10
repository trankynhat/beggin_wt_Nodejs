const request = require("supertest");
const express = require("express");
const app = require("./app"); // Đảm bảo bạn export app từ tệp app.js

describe("Test API Endpoints", () => {
  it("GET /items should return all items", async () => {
    const response = await request(app).get("/items");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("POST /items should create a new item", async () => {
    const response = await request(app)
      .post("/items")
      .send({ postname: "Item mới" });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("name", "Item mới");
  });

  // Các kiểm tra khác...
});
