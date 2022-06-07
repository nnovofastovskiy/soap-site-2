import {Schema, model, Types, Document} from "mongoose";

// interface
export interface IOrder extends Document {
  name: string;
  email: string;
  phone: string;
  address: string;
  items: IOrderItem[];
  status: string;
  cancelled: boolean;
  date: string;
}

export interface IOrderItem {
  product: {
    name: string,
    price: number
  },
  count: number
}

// schema
const orderSchema = new Schema<IOrder>({
  name: {
    type: String
  },

  email: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  address: {
    type: String
  },

  items:  [
    {
      _id: false,
      product: {
        name: String,
        price: Number,
      },
      count: {
        type: Number,
      }
    }
  ],

  status: {
    type: String
  },

  cancelled: {
    type: Boolean
  },

  date: {
    type: String,
    required:true
  },
});

// model
export default model<IOrder>("Order", orderSchema);