var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mapsSchema = new Schema({
    title: String,
    lat: Number,
    lng: Number
})

module.exports = mongoose.model('Maps', mapsSchema);