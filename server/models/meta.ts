// мета-настройки работы сайта, так-же как и склад - скинглтон
import {Schema, model, Types} from "mongoose";

// interface
export interface IMeta{
  _id?: Types.ObjectId;
  isEmails: boolean;
  isLog: boolean;
  isBackup: boolean;
}

// schema
const metaSchema = new Schema<IMeta>({
  isEmails: Boolean,

  isLog: Boolean,

  isBackup: Boolean
});

// model
export default model<IMeta>("Meta", metaSchema);

