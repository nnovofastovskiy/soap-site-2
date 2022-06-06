import {Schema, model, Types} from "mongoose";

// interface
export interface IProduct {
  _id: Types.ObjectId;
  name: string;
  collectionId: Types.ObjectId;
  price: number;
  description: string;
  isActive: boolean;
  popular: boolean;
  sales: {
    saleId: Types.ObjectId
  }[];
  images: {
    url: string,
    alt: string
  }[];
}

// schema
const productSchema = new Schema<IProduct>({
  name: {
    type: String,
  },
  collectionId: {
    type: Schema.Types.ObjectId,
    ref: "Collection"
  },
  price: {
    type: Number
  },
  description: {
    type: String
  },
  isActive: {
    type: Boolean
  },
  popular: {
    type: Boolean
  },
  sales: [
    {
      _id: false,
      saleId: {
        type: Schema.Types.ObjectId,
        ref: "Sale"
      }
    }
  ],
  images: [
    {
      _id: false,
      url: String,
      alt: String
    }
  ]
});

// model
export default model<IProduct>("Product", productSchema);


