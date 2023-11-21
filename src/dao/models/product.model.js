const mongoose = require('mongoose');

const productSchema
    = new mongoose.Schema({
        title :{type:String, require:true},
        description :{type:String, require:true},
        price :{type:Number, require:true},
        thumbnail :{type:String, require:true},
        code :{type:String, require:true, unique: true},
        stock :{type:Number, require:true},
        status :{type:String, require:true},
        category :{type:String, require:true}
}, {timestamps:true});

module.exports = mongoose.model('Product', productSchema);