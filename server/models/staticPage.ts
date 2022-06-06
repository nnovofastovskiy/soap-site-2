import {Schema, model, Types} from "mongoose";

// interface
export interface IStaticPage {
  _id: Types.ObjectId;
  pageName: string;
  content: string;
}

// schema
const staticPageSchema = new Schema<IStaticPage>({
  pageName: String,
  content: String
});

// model
export default model<IStaticPage>("StaticPage", staticPageSchema);