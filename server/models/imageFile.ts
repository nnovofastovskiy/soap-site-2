import {Schema, model, Types} from "mongoose";

// interface
export interface IImageFile {
  _id?: Types.ObjectId;
  i_type: string;
  i_fileName: string;
  i_path: string;
  i_alt: string
}

// schema
const imageFileSchema = new Schema<IImageFile>({
  i_type: String,

  i_fileName: String,

  i_path: String,

  i_alt: String,
});

// model
export default model<IImageFile>("ImageFile", imageFileSchema);