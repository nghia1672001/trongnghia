const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const messageSchema = new Schema({
    Noidung: {type: String},
    Seen: {type: Boolean},
})

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;