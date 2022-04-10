const {Schema, model} = require("mongoose");

const imageSetSchema = new Schema({
    images: [
        {
            _id: false,
            imageType: String,
            fileName: String,
            path: String,
            alt: String,
        }
    ]
})

module.exports = model("ImageSet", imageSetSchema);