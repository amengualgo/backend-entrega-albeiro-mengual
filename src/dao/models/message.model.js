const mongoose = require('mongoose');

const messageSchema
    = new mongoose.Schema({
    username :{type:String, require:true},
    message :{type:String, require:true}
}, {timestamps:true});

module.exports = mongoose.model('Message', messageSchema);