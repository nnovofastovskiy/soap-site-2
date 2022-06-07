import {Schema, model, Types, Document} from "mongoose";

// interface
export interface IImageAlt extends Document {
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