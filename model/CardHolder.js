const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    checkInOut: {
        type: Boolean,
        default: false
    },
    checkInDate: {
        type: Date
    },
    checkOutDate: {
        type: Date
    }

})

module.exports = mongoose.model("CardHolder", CardSchema)