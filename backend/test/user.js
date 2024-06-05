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
        expect(response.status).to.equal(200); // Assuming a successful POST returns a 200 status code
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
        expect(signupResponse.status).to.equal(200);
        const signinResponse = await request.post("auth/signin").send(data);
        expect(signinResponse.status).to.equal(200);
      } catch (error) {
        throw error;
      }
    });
  });

  describe("POST /send mail", () => {
    it("should send mail details and store in mongodb", async () => {
      // try {
      //   const email = `testing-${Math.floor(Math.random() * 9999)}@gmail.com`;
      //   const data = {
      //     email: `${email}`,
      //     password: "1111",
      //   };
      //   const signupResponse = await request.post("auth/signup").send(data);
      //   console.log("Signup Response Status:", signupResponse.status);
      //   expect(signupResponse.status).to.equal(200);
      //   const signinResponse = await request.post("auth/signin").send(data);
      //   console.log("Signin Response Status:", signinResponse.status);
      //   expect(signinResponse.status).to.equal(200);
      //   const authToken = signinResponse.body.token;
      //   console.log("TOKEN", signinResponse.body.token);
      //   const mailData = {
      //     to: `testing-${Math.floor(Math.random() * 9999)}@gmail.com`,
      //     from: `${email}`,
      //     body: "<h1>Test Mail</h1>",
      //     subject: "Test Mail",
      //   };
      //   const sendMailResponse = await request
      //     .post("mail/sendmail")
      //     .set("authorization", `Bearer ${authToken}`)
      //     .send(mailData);
      //   console.log("Send Mail Response Status:", sendMailResponse.status);
      //   console.log("Send Mail Response Body:", sendMailResponse.body);
      //   expect(sendMailResponse.status).to.equal(200);
      //   const getMailResponse = await request
      //     .get("mail/getInboxMail")
      //     .set("authorization", `Bearer ${authToken}`);
      //   console.log("Get Mail Response Status:", sendMailResponse.status);
      //   console.log("Get Mail Response Body:", sendMailResponse.body);
      //   expect(getMailResponse.status).to.equal(200);
      // } catch (error) {
      //   console.log(error);
      //   throw error;
      // }
    });
  });
});
