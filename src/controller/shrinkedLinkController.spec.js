const request = require("supertest");
const server = require("../server");

describe("shrinkedLinkController", () => {
  describe("POST", () => {
    test("Should return 200 on POST success", async () => {
      const result = await request(server)
        .post("/shrink")
        .send("http://any-url.com");
      expect(result.status).toBe(200);
    });

    test("Should return 404 on POST other urls", async () => {
      const result = await request(server)
        .post("/wrong-url")
        .send("http://any-url.com");
      expect(result.status).toBe(404);
    });

    test("Should return 400 on POST if nothing is sent", async () => {
      const result = await request(server).post("/shrink");
      expect(result.status).toBe(400);
    });

    test.each`
      invalidUrl
      ${"invalid-url"}
      ${"htp://invalid-url.com"}
      ${"httpss://invalid-url.com"}
      ${"http://invalid-url"}
      ${"http://invalid-url."}
    `(
      "Should return 400 on POST if invalid URL ($invalidUrl) is sent",
      async ({ invalidUrl }) => {
        const result = await request(server).post("/shrink").send(invalidUrl);
        expect(result.status).toBe(400);
      }
    );
  });
});
