const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chapterSchema = new Schema({
    ChapterTitle: { type: String },
    ChapterContent: {type: String},
})

const ChapTer = mongoose.model("ChapTer", chapterSchema);

module.exports = ChapTer;