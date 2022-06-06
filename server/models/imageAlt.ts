import {Schema, model, Types} from "mongoose";

// interface
export interface IImageAlt {
  _id?: Types.ObjectId;
  i_path: string;
  i_alt: string;
}

// schema
const imageAltSchema = new Schema<IImageAlt>({
  i_path: String,
  i_alt: String,
});

// model
export default model<IImageAlt>("ImageAlt", imageAltSchema);