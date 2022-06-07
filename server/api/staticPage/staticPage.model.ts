import {Schema, model, Types, Document} from "mongoose";

// interface
export interface IStaticPage extends Document {
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