const {Schema, model} = require("mongoose");

const contactsSchema = new Schema({
    phone: {
        type: String,
    },
    email: {
        type: String
    },
    telegram: {
        type: String
    },
    whatsapp: {
        type: String
    },
});

module.exports = model("Contacts", contactsSchema);