import supertest from "supertest";
import { expect } from "chai";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = "http://127.0.0.1:3000/api/";

const request = supertest(BASE_URL);

describe("Users API Tests", () => {
  describe("POST /signup", () => {
    it("should create a new user", async () => {
      const data = {
        email: `testing-${Math.floor(Math.random() * 9999)}@gmail.com`,
        password: "1111",
      };

      try {
        const response = await request.post("auth/signup").send(data);
        console.log("Response Status:", response.status);
        console.log("Response Body:", response.body);
        expect(response.status).to.equal(200); // Assuming a successful POST returns a 200 status code
        //expect(response.body.data).to.deep.include(data);
      } catch (error) {
        throw error;
      }
    });
  });

  describe("POST /signin", () => {
    it("should create a new user and login user", async () => {
      const data = {
        email: `testing-${Math.floor(Math.random() * 9999)}@gmail.com`,
        password: "1111",
      };

      try {
        const signupResponse = await request.post("auth/signup").send(data);
        console.log("Response Status:", signupResponse.status);
        console.log("Response Body:", signupResponse.body);
        expect(signupResponse.status).to.equal(200); // Assuming a successful POST returns a 200 status code
        //expect(response.body.data).to.deep.include(data);

        const signinResponse = await request.post("auth/signin").send(data);
        console.log("Response Status Login:", signupResponse.status);
        console.log("Response Body Login:", signupResponse.body);
        expect(signinResponse.status).to.equal(200);
      } catch (error) {
        throw error;
      }
    });
  });
});
