const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const theloaiSchema = new Schema({
    TenTheLoai: { type: String, required: true },
    MoTa: { type: String},
})

const TheLoai = mongoose.model("TheLoai", theloaiSchema);

module.exports = TheLoai;