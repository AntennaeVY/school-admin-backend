const supertest = require("supertest");
const app = require("../server.js");

const api = supertest(app);
let testUser;
let updateTestUser;
let loginInfo;
let userId;
let secondUserId;
let userEmail;
let token;

describe("GET /users", () => {
  test("missing token, expects 401", async () => {
    await api
      .get("/api/users")
      .expect(401)
      .expect("Content-Type", /application\/json/);
  });

  test("token provided, expects 200, returns all users", async () => {
    await api
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

describe("POST /users", () => {
  test("sending invalid json, expects 400", async () => {
    await api
      .post("/api/users")
      .send({})
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  test("sending valid json, expects 200, returns user", async () => {
    await api
      .post("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .send(testUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

describe("POST /users/email", () => {
  test("sending invalid json, expects 400", async () => {
    await api
      .post("/api/users/email")
      .send({})
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  test("missing token, expects 401", async () => {
    await api
      .get("/api/users/email")
      .expect(401)
      .expect("Content-Type", /application\/json/);
  });

  test("sending non-existent email, expects 404", async () => {
    await api
      .post("/api/users/email")
      .set("Authorization", `Bearer ${token}`)
      .send({ email: `dfafdafadfada@gmail.com` })
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("sending valid json, expects 200, returns user", async () => {
    await api
      .post("/api/users/email")
      .set("Authorization", `Bearer ${token}`)
      .send({ email: `${userEmail}` })
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

describe("GET /users/id/:id", () => {
  test("missing token, expects 401", async () => {
    await api
      .get("/api/users/id/1")
      .expect(401)
      .expect("Content-Type", /application\/json/);
  });

  test("sending invalid id, expects 400", async () => {
    await api
      .get("/api/users/id/1")
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  test("sending non-existent id, expects 404", async () => {
    await api
      .get(`/api/users/id/6205abd36282d43460b79818`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("sending valid token and id, expects 200, returns user", async () => {
    await api
      .get(`/api/users/id/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

describe("PUT /users/id/:id", () => {
  test("missing token, expects 401", async () => {
    await api
      .put("/api/users/id/1")
      .send(updateTestUser)
      .expect(401)
      .expect("Content-Type", /application\/json/);
  });

  test("sending invalid id, expects 400", async () => {
    await api
      .put("/api/users/id/1")
      .set("Authorization", `Bearer ${token}`)
      .send(updateTestUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  test("updating another user without permission, expects 401", async () => {
    await api
      .put("/api/users/id/620661c60e9bb738a40b079f")
      .set("Authorization", `Bearer ${token}`)
      .send(updateTestUser)
      .expect(401)
      .expect("Content-Type", /application\/json/);
  });

  test("sending non-existent id, expects 404", async () => {
    await api
      .put(`/api/users/id/6205abd36282d43460b79818`)
      .set("Authorization", `Bearer ${token}`)
      .send(updateTestUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("sending valid token and id, expects 200, returns user", async () => {
    await api
      .put(`/api/users/id/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updateTestUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

describe("DELETE /users/id/:id", () => {
  test("missing token, expects 401", async () => {
    await api
      .delete("/api/users/id/1")
      .send(updateTestUser)
      .expect(401)
      .expect("Content-Type", /application\/json/);
  });

  test("sending invalid id, expects 400", async () => {
    await api
      .delete("/api/users/id/1")
      .set("Authorization", `Bearer ${token}`)
      .send(updateTestUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  test("deleting another user without permission, expects 401", async () => {
    await api
      .delete("/api/users/id/620661c60e9bb738a40b079f")
      .set("Authorization", `Bearer ${token}`)
      .send(updateTestUser)
      .expect(401)
      .expect("Content-Type", /application\/json/);
  });

  test("sending non-existent id, expects 404", async () => {
    await api
      .delete(`/api/users/id/6205abd36282d43460b79818`)
      .set("Authorization", `Bearer ${token}`)
      .send(updateTestUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("sending valid token and id, expects 200, returns user", async () => {
    await api
      .delete(`/api/users/id/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updateTestUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

describe("POST /auth/login", () => {
  test("sending invalid json, expects 400", async () => {
    await api
      .post("/api/auth/login")
      .send({})
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  test("sending wrong credentials, expects 403", async () => {
    await api
      .post("/api/auth/login")
      .send(loginInfo)
      .expect(403)
      .expect("Content-Type", /application\/json/);
  });

  test("sending valid json, expects 200, returns user", async () => {
    await api
      .post("/api/auth/login")
      .set("Authorization", `Bearer ${token}`)
      .send(loginInfo)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});
