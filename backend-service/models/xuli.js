const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const xulySchema = new Schema({

    TinhTrang: { type: String },
    NgayMuon: { type: String, required: true },
    NgayTra: { type: String, required: true },
    User: { type:String },
    Sach: {type:String}, 
})

const Xuly = mongoose.model("Xuly", xulySchema);

module.exports = Xuly;