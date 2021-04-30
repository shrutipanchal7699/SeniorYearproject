//author Param Patel
//012421227
const mongoose = require("mongoose");
const Car = require("../models/products");
exports.cars_get_all = (req, res, next) => {
  Car.find({})
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            _id: doc._id,
            name: doc.name,
            car_type: doc.car_type,
            rate_per_hour: doc.rate_per_hour,
            description: doc.description,
            number_of_seats: doc.number_of_seats,
            location: doc.location,
            lat: doc.lat,
            lng: doc.lng,
            productImage: doc.url,
            created_by: {
              id: doc.created_by.id,
              username: doc.username
            },
            unavail: doc.unavail.map(time => {
              return {
                from: time.from,
                to: time.to
              }
            }),
            request: {
              type: "GET",
              url: "http://localhost:3000/cars/" + doc._id
            }
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
exports.cars_create_product = (req, res, next) => {

  const car = new Car({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    car_type: req.body.car_type,
    rate_per_hour: req.body.rate_per_hour,
    description: req.body.description,
    number_of_seats: req.body.number_of_seats,
    location: req.body.location,
    lat: req.body.lat,
    lng: req.body.lng,
    url: req.body.imgurl,
    created_by: {
      id: req.body.created_by,
      username: req.body.username
    },
  });
  car
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created product successfully",
        createdProduct: {
          name: result.name,
          car_type: result.car_type,
          rate_per_hour: result.rate_per_hour,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/cars/" + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.cars_get_product = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select("*")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/products"
          }
        });
      } else {
        res
          .status(404)
          .json({
            message: "No valid entry found for provided ID"
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.cars_update_product = (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({
      _id: id
    }, {
      $set: updateOps
    })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Product updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/products/" + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};


exports.cars_delete = (req, res, next) => {
  const id = req.params.productId;
  Product.remove({
      _id: id
    })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Product deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/products",
          body: {
            name: "String",
            price: "Number"
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};