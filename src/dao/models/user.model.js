const mongoose = require('mongoose');

const userSchema
    = new mongoose.Schema({
    first_name :{type:String, require:true, },
    last_name :{type:String, require:true,},
    age :{type:Number, require:false},
    email :{type:String, require:true,  unique: true},
    password :{type:String, require:true},
    rol:{type:String, require:false, default:'usuario'}
}, {timestamps:true});

module.exports = mongoose.model('user', userSchema);