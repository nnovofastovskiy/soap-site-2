// удалённая сущность (account | collection | order | product | sale)
import {Schema, model, Types} from "mongoose";

// interface
export interface IDeletedEntity {
  _id?: Types.ObjectId;
  entityType: string;
  deletedObjectId: Types.ObjectId;
  entityPropsJSON: string
}

// schema
const deletedEntitySchema = new Schema<IDeletedEntity>({
  entityType: {
    type: String,   //account | collection | order | product | sale
  },
  deletedObjectId: {
    type: Schema.Types.ObjectId
  },
  entityPropsJSON: {
    type: String,   // для разворачивания - JSON.parse
  },
});

// model
export default model<IDeletedEntity>("DeletedEntity", deletedEntitySchema);