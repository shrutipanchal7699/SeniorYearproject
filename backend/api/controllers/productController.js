const mongoose = require("mongoose");
const products = require("../models/products");
const axios = require('axios');


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

exports.get_product_details = async(req, res, next) => {
  //const id = req.params.id;
  
  let id = await Number(req.params.id);
  console.log(id);
  await products.find({
    block_chain_id: id 
  })
    .exec()
    .then(doc => {
      if (doc) {
        console.log(doc)
        return res.status(200).json({
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
        return res
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

exports.checkout = async(req, res, next) => {
  
  const products = await {
    
    user_id: req.body.created_by,
    all_products: req.body.all_products,
  }
  console.log(products)
  await axios.post('http://localhost:8082/transactions',products)
    .catch((error) =>
    {
      console.log(error)
      return res.status(error.status).json(error.data)

    }).then((answer) => {

    console.log(answer.data)
    return res.status(answer.status).json(answer.data);

    })
  

};

exports.create_product = async(req, res, next) => {
  let prod = await [];
  await prod.push(req.body);
  const products = await {
    
    user_id: req.body.created_by,
    all_products: prod
  }
  await axios.post('http://localhost:8082/create_products',products)
    .catch((error) =>
    {
      return res.status(error.status).json(error.data)

    }).then((answer) => {

    return res.status(answer.status).json(answer.data);

    })
  

};

