const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    category: mongoose.Schema.Types.ObjectId,
    tasks: [{ description: String, isCompleted: Boolean, }],
})

const List = mongoose.model("List", listSchema);

module.exports = List;