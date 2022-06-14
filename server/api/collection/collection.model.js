const {Schema, model} = require("mongoose");

const collectionSchema = new Schema({
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

module.exports = model("Collection", collectionSchema);