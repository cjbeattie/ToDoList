const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    tasks: [{ description: String, isCompleted: Boolean, }],
})

const List = mongoose.model("List", listSchema);

module.exports = List;