const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const xulySchema = new Schema({

    TinhTrang: { type: Number },
    NgayMuon: { type: String, required: true },
    NgayTra: { type: String, required: true },
    User: [],
    Sach: [],
})

const Xuly = mongoose.model("Xuly", xulySchema);

module.exports = Xuly;