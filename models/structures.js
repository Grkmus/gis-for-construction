var mongoose = require("mongoose");

var structureSchema = mongoose.Schema({
    strName: String,
    type: String,
    NOrevNumber: Number,
    location: Object
});

module.exports = mongoose.model("Structure", structureSchema);