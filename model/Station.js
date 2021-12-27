const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const StationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    preStat: {
        type: mongoose.Schema.Types.ObjectId,
        // ref: "Station",
        default: null
    },
    nextStat: {
        type: mongoose.Schema.Types.ObjectId,
        //ref: "Station",
        default: null
    },
    checkOutPrice: {
        type: Number,
        default: 2
    },
    checkIns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CardHolder' }]
})

module.exports = mongoose.model("Station", StationSchema);