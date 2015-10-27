var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodejsdemo');
exports.mongoose = mongoose;