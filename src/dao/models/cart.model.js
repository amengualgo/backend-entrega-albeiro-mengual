const mongoose = require('mongoose');

const cartSchema
    = new mongoose.Schema({
        products : {type:[{_id: {type:String, require:true}, quantity: {type:Number, require:true}}]}
}, {timestamps:true});

module.exports = mongoose.model('Cart', cartSchema);