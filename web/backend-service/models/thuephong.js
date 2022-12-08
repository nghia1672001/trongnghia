const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thuePhongSchema = new Schema({
    NgayThue: { type: String },
    SoPhong: { type: String },
})

const ThuePhong = mongoose.model("ThuePhong", thuePhongSchema);

module.exports = ThuePhong;