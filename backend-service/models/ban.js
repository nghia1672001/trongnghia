const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const banSchema = new Schema({
    NgayThue: { type: Date, required: true },
    SoBan: { type: String },
    TinhTrang: { type: Number }, /*1.Đã trả bàn, 2.Đang đặt bàn, 3.Đang xử lí*/
    NguoiMuon: { type: String, require: true },
})

const Ban = mongoose.model("Ban", banSchema);

module.exports = Ban;