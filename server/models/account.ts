// модель пользователя
import {Schema, model, Types, Document} from "mongoose";

// 1 interface
export interface IAccount extends Document {
  email: string;
  name: string;
  password: string;
  verified: boolean;
  emailToken: string;
  emailTokenExp: Date;
  resetToken: string;
  resetTokenExp: Date;
  cartItems: ICartItem[];
  orders: IOrderItem[];
  wishlist: IWishlistItem[];
}

export interface ICartItem {
  productId: Types.ObjectId;
  count: number;
}

export interface IOrderItem {
  orderId: Types.ObjectId;
}

export interface IWishlistItem {
  productId: Types.ObjectId;
}

// 2 schema
const accountSchema = new Schema<IAccount>({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    required: true
  },
  emailToken: String,
  emailTokenExp: Date,
  resetToken: String,
  resetTokenExp: Date,
  cartItems: [
    {
      _id: false,
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      count: {
        type: Number,
      }
    }
  ],
  orders: [
    {
      _id: false,
      orderId: {
        type: Schema.Types.ObjectId,
        ref: "Order"
      }
    }
  ],
  wishlist: [
    {
      _id: false,
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      }
    }
  ]
});

// 3 model
export default model<IAccount>("Account", accountSchema);