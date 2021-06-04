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
  });
});
