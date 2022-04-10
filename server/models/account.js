// модель пользователя

const {Schema, model} = require("mongoose");

const accountSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
    },
    password: {
        type: String,
        required: true
    },
    roles: [
        {
            _id: false,
            type: String,
            ref: "Role"
        }]
});

module.exports = model("Account", accountSchema);