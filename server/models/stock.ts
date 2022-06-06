// модель склада
import {Schema, model, Types} from "mongoose";

// 1 interface
export interface IStock {
  _id: Types.ObjectId;
  products: {
    productId: Types.ObjectId;
    quantity: number
  }[]
}

// 2 schema
const stockSchema = new Schema<IStock>({
  products: [
    {
      _id: false,
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: Number
    }
  ]
});

// 3. model
export default model<IStock>("Stock", stockSchema);