var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/photo_app');

var Schema = mongoose.Schema;
var Photo = new Schema({
    name: String,
    path: String
});

module.exports = mongoose.model('Photo', Photo);