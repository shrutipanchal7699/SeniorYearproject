const mongoose = require("mongoose");
const products = require("../models/products");
exports.products_get_all = (req, res, next) => {
  console.log(req.body.created_by);
  products.find({
     $and: [ { currentOwner : { $ne: req.body.created_by}},
              { isAvailable: {$ne : false}}
          ]})
    .exec()
    .then(docs => {
      //console.log(docs)
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            _id: doc.block_chain_id,
            name: doc.name,
            image: doc.photos,
            description: doc.description,
            price: doc.price,
            countInStock: doc.quantity,
            location: doc.location,
            owners: doc.owners,
            currentOwner: doc.currentOwner,
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

exports.get_product_details = (req, res, next) => {
  //const id = req.params.id;
  console.log(req.params.id);
  products.find({
    block_chain_id: req.params.id 
  })
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            _id: doc[0].block_chain_id,
            name: doc[0].name,
            image: doc[0].photos,
            price: doc[0].price,
            countInStock: doc[0].quantity,
            description: doc[0].description,
            location: doc[0].location,
            currentOwner: doc[0].currentOwner
        });
      } else {
        res
          .status(404)
          .json({
            message: "Couldn't find the product you were looking for"
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

exports.create_product = (req, res, next) => {
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

