const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const sachSchema = new Schema({

    LuotXem: { type: String },
    SoLuong: { type: Number, required: true },
    MoTa: { type: String, required: true },
    BookImage: { type: String},
    NoiDung: {type: String},
    TenSach: { type: String, required: true },
    NamSangTac: { type: String, required: true },
    TacGia: [],
    TheLoai: [],
    Chapter:[],
    BinhLuan:[],
})

const Sach = mongoose.model("Sach",sachSchema);

module.exports = Sach;