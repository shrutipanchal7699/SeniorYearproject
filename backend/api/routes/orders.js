//author Param Patel
//012421227
const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const OrdersController = require('../controllers/orders');

//gets all oreders if valid header authorization
/* {
    count:,
    orders:[
        {
            _id: doc._id,
            car: doc.car,
            on_rent: doc.on_rent.map(curr => {
                return {
                    cus_id: curr.cus_id,
                    from: curr.from,
                    to: curr.to
                }
            }),
            request: {
                type: "GET",
                url: "http://localhost:3000/orders/" + doc._id
            }
        },
         {
             _id: doc._id,
             car: doc.car,
             on_rent: doc.on_rent.map(curr => {
                 return {
                     cus_id: curr.cus_id,
                     from: curr.from,
                     to: curr.to
                 }
             }),
             request: {
                 type: "GET",
                 url: "http://localhost:3000/orders/" + doc._id
             }
         }
    ]
} */
router.get("/",OrdersController.orders_get_all);
//post create order throws error if time clash
//send token in header
/*  receives
{carId: mongoose.Schema.Types.ObjectId,
    from: {
            https: //www.w3schools.com/jsref/jsref_toutcstring.asp
        date to utcstring 
    },
    to: {
        https: //www.w3schools.com/jsref/jsref_toutcstring.asp
        date to utcstring
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
}*/
/* sends
{
    message: "Order stored",
    createdOrder: {
        _id: result._id,
        product: result.product,
        quantity: result.quantity
    },
    request: {
        type: "GET",
        url: "http://localhost:3000/orders/" + result._id
    }
}
 */
router.post("/", checkAuth, OrdersController.orders_create_order);
//get particular order
//needs authentication through header
/* order: {{
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
    }
} ,
request: {
    type: "GET",
    url: "http://localhost:3000/orders"
} */
router.get("/:orderId", OrdersController.orders_get_order);
//needs authentication through header for internal use only
//receives
//{orderId:}
//
router.delete("/:orderId", OrdersController.orders_delete_order);

module.exports = router;
