//author Param Patel
//012421227
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type : String, required : true },
    email: { type : String, required : true, unique : true  },
    password: { type : String, required : true },
    isAdmin: { type : Boolean, required : false, default: false },
    location: { type : String, required : true },
    certification: { type : String, required : true },
    description: { type : String, required : false },
    //location:
    //certification:
    //isProducer: { type : Boolean, required : true },
    //isConsumer: { type : Boolean, required : true },
    currentBalance:{
        type:Number,
        required: false,
    },

}, {
    timestamps : true
});


module.exports = mongoose.model('User', userSchema);