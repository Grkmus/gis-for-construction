var mongoose = require("mongoose");

var chainageSchema = mongoose.Schema({
    kmText: String,
    kmTextAngle: String,
    location: Object
});

module.exports = mongoose.model("Chainage", chainageSchema);