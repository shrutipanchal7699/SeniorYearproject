
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    block_chain_id: Number,
    isAvailable: Boolean,
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
        default: null
    },
    photos: {
        type: String,
        required: true,
    },
   //all_owner: [
   //     id: {
   //         type: mongoose.Schema.Types.ObjectId,
   //         ref: "User"
   //     },
   // ],
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    quantity: {
        type:Number,
        required: true,
    },
    price: {
        type:Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
        default: null
    }
});

module.exports = mongoose.model('Products', productSchema);