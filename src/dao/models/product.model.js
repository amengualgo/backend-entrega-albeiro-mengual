const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const productSchema
    = new mongoose.Schema({
        title :{type:String, require:true, },
        description :{type:String, require:true,},
        price :{type:Number, require:true},
        thumbnail :{type:String, require:true},
        code :{type:String, require:true, unique: true},
        stock :{type:Number, require:true},
        status :{type:String, require:true},
        category :{type:String, require:true, index:true}
}, {timestamps:true});
productSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('products', productSchema);