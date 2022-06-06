import {Schema, model, Types} from "mongoose";

// interface
export interface ICollection {
  _id: Types.ObjectId | undefined;
  name: string;
  description: string;
  image: {
    url: string,
    alt: string
  };
  products: {
    productId: Types.ObjectId
  }[]
  sales: {
    saleId: Types.ObjectId
  }[]
}

// schema
const collectionSchema = new Schema<ICollection>({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    _id: false,
    url: String,
    alt: String
  },
  products: [
    {
      _id: false,
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product"
      }
    }
  ],
  sales: [
    {
      _id: false,
      saleId: {
        type: Schema.Types.ObjectId,
        ref: "Sale"
      }
    }
  ],
});

// model
export default model<ICollection>("Collection", collectionSchema);