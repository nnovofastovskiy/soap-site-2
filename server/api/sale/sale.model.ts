// модель скидки
import {Schema, model, Types, Document} from "mongoose";

// interface
export interface ISale extends Document {
  saleType: string;
  saleValue: number;
  saleName: string;
  saleDescription: string;
}

// schema
const saleSchema = new Schema<ISale>({
  saleType: {
    type: String    // проценты "percent" или константное число "number"
  },

  saleValue: {
    type: Number    // число, если процент - то от 1 до 99, если цифра - то больше 0
  },

  saleName: {
    type: String    // название
  },
  saleDescription: {
    type: String    // описание
  }
});

// model
export default model<ISale>("Sale", saleSchema);