//author Param Patel
//012421227
const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    cus_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    from: {
        type: Date,
        required: false,
        default: null
    },
    to: {
        type: Date,
        required: false,
        default: null
    },
    bill: {
        first_name: String,
        last_name: String,
        address: String,
        card_no: Number,
        expiry_Date: Date,
        cvv: Number,
    },
    billing: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Order', orderSchema);