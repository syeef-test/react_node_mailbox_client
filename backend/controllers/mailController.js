import { Mail } from "../models/mailModel.js";

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

    //console.log(newMail);

    const response = await Mail.create(newMail);

    if (!response) {
      return res.status(500).send({ message: "Failed to send mail" });
    }

    return res.status(200).send(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const getInboxMail = async (req, res, next) => {
  try {
    const response = await Mail.find({ to: req.user.email, status: true });

    if (!response.length) {
      return res.status(404).send({ message: "No mail data found in inbox" });
    }
    return res
      .status(200)
      .send({ message: "Mail data found in inbox", data: response });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    const { emailId } = req.params;
    const update = { read: true };
    const response = await Mail.findByIdAndUpdate(emailId, update, {
      new: true,
    });

    if (!response) {
      return res.status(404).send({ message: "No mail data found for read" });
    }
    return res
      .status(200)
      .send({ message: "Mail marked as read", data: response });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const markAsDelete = async (req, res, next) => {
  try {
    const { emailId } = req.params;
    const update = { status: false };

    const response = await Mail.findByIdAndUpdate(emailId, update, {
      new: true,
    });

    if (!response) {
      return res.status(404).send({ message: "No mail data found for delete" });
    }
    return res
      .status(200)
      .send({ message: "Mail marked as delete", data: response });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const getSentMail = async (req, res, next) => {
  try {
    const response = await Mail.find({ from: req.user.email, status: true });
    if (!response.length) {
      return res.status(404).send({ message: "No mail data found in sent" });
    }
    return res
      .status(200)
      .send({ message: "Mail data found in sent", data: response });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};
