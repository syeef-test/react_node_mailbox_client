import supertest from "supertest";
import { expect } from "chai";
import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

const BASE_URL = "http://127.0.0.1:3000/api/";

const request = supertest(BASE_URL);

describe("Users API Tests", () => {
  describe("POST /signup", () => {
    // it("should create a new user", async () => {
    //   const data = {
    //     email: `testing-${Math.floor(Math.random() * 9999)}@gmail.com`,
    //     password: "1111",
    //   };
    //   try {
    //     const response = await request.post("auth/signup").send(data);
    //     expect(response.status).to.equal(200); // Assuming a successful POST returns a 200 status code
    //   } catch (error) {
    //     throw error;
    //   }
    // });
  });

  describe("POST /signin", () => {
    // it("should create a new user and login user", async () => {
    //   const data = {
    //     email: `testing-${Math.floor(Math.random() * 9999)}@gmail.com`,
    //     password: "1111",
    //   };
    //   try {
    //     const signupResponse = await request.post("auth/signup").send(data);
    //     expect(signupResponse.status).to.equal(200);
    //     const signinResponse = await request.post("auth/signin").send(data);
    //     expect(signinResponse.status).to.equal(200);
    //   } catch (error) {
    //     throw error;
    //   }
    // });
  });

  describe("POST /send mail", () => {
    // it("should send mail details and store in mongodb", async () => {
    //   try {
    //     const data = {
    //       email: `kazisyeef@gmail.com`,
    //       password: "123",
    //     };
    //     const signinResponse = await axios.post(
    //       `http://127.0.0.1:3000/api/auth/signin`,
    //       data
    //     );
    //     console.log("Signin Response Status:", signinResponse);
    //     expect(signinResponse.status).to.equal(200);
    //     const authToken = signinResponse.data.token;
    //     //console.log("TOKEN", signinResponse.data.token);
    //     const mailData = {
    //       to: `testing-${Math.floor(Math.random() * 9999)}@gmail.com`,
    //       from: data.email,
    //       body: "<h1>Test Mail</h1>",
    //       subject: "Test Mail",
    //     };
    //     const sendMailResponse = await axios.post(
    //       `http://127.0.0.1:3000/api/mail/sendmail`,
    //       mailData,
    //       {
    //         headers: {
    //           authorization: `${authToken}`,
    //         },
    //       }
    //     );
    //     console.log("Send Mail Response Status:", sendMailResponse.status);
    //     expect(sendMailResponse.status).to.equal(200);
    //     const getMailResponse = await axios.get(
    //       `http://127.0.0.1:3000/api/mail/getInboxMail`,
    //       {
    //         headers: {
    //           authorization: `${authToken}`,
    //         },
    //       }
    //     );
    //     console.log("Get Mail Response Status:", sendMailResponse.status);
    //     console.log("Get Mail Response Body:", sendMailResponse.data);
    //     expect(getMailResponse.status).to.equal(200);
    //   } catch (error) {
    //     console.log(error);
    //     throw error;
    //   }
    // });
  });

  describe("POST /readmail", () => {
    it("should mark the mail as read", async () => {
      try {
        const data = {
          email: `syeefislam@yahoo.com`,
          password: "123",
        };

        const signinResponse = await axios.post(
          `http://127.0.0.1:3000/api/auth/signin`,
          data
        );

        expect(signinResponse.status).to.equal(200);
        const authToken = signinResponse.data.token;

        const mailData = {
          to: `kazisyeef@gmail.com`,
          from: data.email,
          body: "<h1>Test Mail</h1>",
          subject: "Test Mail",
        };

        const sendMailResponse = await axios.post(
          `http://127.0.0.1:3000/api/mail/sendmail`,
          mailData,
          {
            headers: {
              authorization: `${authToken}`,
            },
          }
        );

        const emailId = sendMailResponse.data._id;

        expect(sendMailResponse.status).to.equal(200);

        const data2 = {
          email: `kazisyeef@gmail.com`,
          password: "123",
        };

        const signinResponse2 = await axios.post(
          `http://127.0.0.1:3000/api/auth/signin`,
          data2
        );

        expect(signinResponse2.status).to.equal(200);
        const authToken2 = signinResponse2.data.token;

        const readMailResponse = await axios.post(
          `http://127.0.0.1:3000/api/mail/markAsRead/${emailId}`
        );

        expect(readMailResponse.status).to.equal(200);
      } catch (error) {
        console.log(error);
        throw error;
      }
    });
  });
});
