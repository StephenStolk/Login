import mongoose, { Document, Schema } from "mongoose";

export interface Contact {
  fullname: string;
  email: string;
  message: string;
  date: Date;
}

export interface ContactDocument extends Contact, Document {}

const contactSchema = new Schema<ContactDocument>({
  fullname: {
    type: String,
    required: [true, "Name is required."],
    trim: true,
    minLength: [2, "name must be larger than 2"],
    maxLength: [50, "Name must be lesser than 50 char"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^[w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/i, "Invalid email message"],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Contact =
  mongoose.model<ContactDocument>("Contact", contactSchema) || mongoose.models.Contact;

export default Contact;
