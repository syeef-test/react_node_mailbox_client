import mongoose from "mongoose";

const mailSchema = mongoose.Schema(
  {
    to: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Mail = mongoose.model("mails", mailSchema);
