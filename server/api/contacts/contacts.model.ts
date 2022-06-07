import {Schema, model, Types, Document} from "mongoose";

// interface
export interface IContacts extends Document {
  phone: string;
  email: string;
  telegram: string;
  whatsapp: string;
}

// schema
const contactsSchema = new Schema<IContacts>({
  phone: {
    type: String,
  },
  email: {
    type: String
  },
  telegram: {
    type: String
  },
  whatsapp: {
    type: String
  },
});

// model
export default model<IContacts>("Contacts", contactsSchema);