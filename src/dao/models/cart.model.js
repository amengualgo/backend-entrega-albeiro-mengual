const mongoose = require('mongoose');

const mongoosePaginate = require('mongoose-paginate-v2');

const productItemSchema = new mongoose.Schema({
        product :{type: mongoose.Schema.Types.ObjectId, ref: 'products', require:true},
        quantity: {type:Number, require:true}},
        {_id: false}
        );

const cartSchema
    = new mongoose.Schema({
        products : {
                type:[productItemSchema], default: []
        }
}, {timestamps:true});

cartSchema.plugin(mongoosePaginate);
cartSchema.pre('findOne', function () {
        this.populate('products.product');

})


module.exports = mongoose.model('carts', cartSchema);