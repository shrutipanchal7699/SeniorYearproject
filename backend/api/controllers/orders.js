//author Param Patel
//012421227
const mongoose = require("mongoose");

const Order = require("../models/order");
const Car = require("../models/products");

exports.orders_get_all = (req, res, next) => {
  Order.find({})
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
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
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.orders_create_order = (req, res, next) => {
  let body = req.body
  var start = Date.parse(body.from)
  var end = Date.parse(body.to)
  console.log(start)
  console.log(end)
  var carId = req.body.carId
  var all_id = null
  if (start < Date.now() || end-start<0) {
    return res.status(404).json({
      message: "invalid Date"
    });
  }
  Car.find({
      _id: carId
    })
    .select('unavail rate_per_hour')
    .lean()
    .exec()
    .then(curr => {
      if (!curr) {
        return res.status(404).json({
          message: "Product not found"
        });
      }
      let cost_num = (end-start)/ 36e5
      
      cost_num = cost_num * curr[0].rate_per_hour 
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        cus_id: req.userData._id,
        car: req.body.carId,
        from: start,
        to: end,
        cost: cost_num,
        bill: {
          first_name: body.bill.first_name,
          last_name: body.bill.last_name,
          address: body.bill.address,
          card_no: body.bill.card_no,
          expiry_Date: body.bill.expiry_Date,
          cvv: body.bill.cvv,
        }
      });
      return order.save();
    })
    .then(result => {
      console.log(result);
      all_id = result._id
      res.status(201).json({
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
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  Car.findByIdAndUpdate({
      _id: carId
    }, {
      $push: {
        "unavail": {
          "from": start,
          "to": end,
          "id": all_id
        }
      }
    },
    function (err, succ) {
      if (err) {
        return res.status(404).json({
          message: "err updating"
        });
      }
    })
};

exports.orders_get_order = (req, res, next) => {
  Order.findById(req.params.orderId)
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: "Order not found"
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: "http://localhost:3000/orders"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.orders_delete_order = (req, res, next) => {
  Order.remove({
      _id: req.params.orderId
    })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Order deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/orders",
          body: {
            productId: "ID",
            quantity: "Number"
          }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
