const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tacgiaSchema = new Schema({
    TenTacGia: { type: Array, required: true },
    Mota: { type: String },
})

const TacGia = mongoose.model("TacGia", tacgiaSchema);

module.exports = TacGia;