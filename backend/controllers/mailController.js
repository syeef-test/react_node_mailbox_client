import { Mail } from "../models/mailModel.js";
import Sib from "sib-api-v3-sdk";
import dotenv from "dotenv";
dotenv.config();

const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SENDING_BLUE_API_KEY;

export const sendMail = async (req, res, next) => {
  try {
    const to = req.body.to;
    const from = req.body.from;
    const body = req.body.body;
    const subject = req.body.subject;

    const newMail = {
      to: to,
      from: from,
      body: body,
      subject: subject,
    };

    const response = await Mail.create(newMail);

    if (!response) {
      return res.status(500).send({ message: "Failed to send mail" });
    }

    return res.status(200).send(response);

    // const tranEmailApi = new Sib.TransactionalEmailsApi();
    // const sender = {
    //   email: "kazisyeef@gmail.com",
    //   name: "kazi",
    // };
    // const receivers = [
    //   {
    //     email: "kazisyeef@gmail.com",
    //   },
    // ];

    // const sendMail = await tranEmailApi.sendTransacEmail({
    //   sender,
    //   to: receivers,
    //   subject: "Reset Password at Expense Tracker",
    //   htmlContent: `<h1>Expense Tracker App</h1>
    //     <p>Click here to reset your password</p>
    //    `,
    //   params: {
    //     email: "kazisyeef@gmail.com",
    //   },
    // });

    // if (sendMail) {
    //   return res.status(200).send({ message: "Mail sent succesfully" });
    // }
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const getInboxMail = async (req, res, next) => {
  try {
    //console.log(req.user);
    const email = req.body.email;
    console.log("email", req.user.email);
    const response = await Mail.find({ to: req.user.email });
    console.log("mail data", response);
    if (!response.length) {
      return res.status(404).send({ message: "No mail data found" });
    }
    return res.status(200).send({ message: "Mail data found", data: response });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};
