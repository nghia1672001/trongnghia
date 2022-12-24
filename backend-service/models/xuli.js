const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const xulySchema = new Schema({

    TinhTrang: { type: Number },/* 1.true, 2.false, 3.pending*/
    NgayMuon: { type: Date, required: true },
    NgayTra: { type: Date, required: true },
    User: { type:String, required:true },
    Sach: {type:String, required: true}, 
})

const Xuly = mongoose.model("Xuly", xulySchema);

module.exports = Xuly;