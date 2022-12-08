const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const binhLuanSchema = new Schema({
    NoiDung: { type: String },
})

const BinhLuan = mongoose.model("BinhLuan", binhLuanSchema);

module.exports = BinhLuan;