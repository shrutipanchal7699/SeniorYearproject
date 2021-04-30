//author Param Patel
//012421227
const express = require("express");
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary');
const checkAuth = require('../middleware/check-auth');
const CarsController = require('../controllers/cars');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + '-' + file.originalname)
  }
})


const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    //reject file
    cb({
      message: 'Unsupported file format'
    }, false)
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024
  },
  fileFilter: fileFilter
})

// cloudinary config
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

//get all cars available
//gets: 
//{count: number,
 /* products: [
   {
     _id: doc._id,
     name: doc.name,
     car_type: doc.car_type,
     rate_per_hour: doc.rate_per_hour,
     description: doc.description,
     number_of_seats: doc.number_of_seats,
     location: doc.location,
     lat: doc.lat,
     lng: doc.lng,
     productImage: doc.productImage,
     created_by: {
       id: doc.created_by.id,
       username: doc.username
     },
     unavail: docs.unavail.map(time => {
       return {
         from: time.from,
         to: time.to
       }
     }),
     request: {
       type: "GET",
       url: "http://localhost:3000/cars/" + doc._id
     }
   },
  {
    _id: doc._id,
    name: doc.name,
    car_type: doc.car_type,
    rate_per_hour: doc.rate_per_hour,
    description: doc.description,
    number_of_seats: doc.number_of_seats,
    location: doc.location,
    lat: doc.lat,
    lng: doc.lng,
    productImage: doc.productImage,
    created_by: {
      id: doc.created_by.id,
      username: doc.username
    },
    unavail: docs.unavail.map(time => {
      return {
        from: time.from,
        to: time.to
      }
    }),
    request: {
      type: "GET",
      url: "http://localhost:3000/cars/" + doc._id
    }
  },....]
   }*/
   
 
router.get("/", CarsController.cars_get_all);
//create cars
//receives
//body form-data in req.body 
//with token in header
//not for external use
/* name: req.body.name,
  car_type: req.body.car_type,
  rate_per_hour: req.body.rate_per_hour,
  description: req.body.description,
  number_of_seats: req.body.number_of_seats,
  location: req.body.location,
  lat: req.body.lat,
  lng: req.body.lng,
  productImage: req.body.productImage,
  created_by: {
    id: req.body.created_by.id,
    username: req.body.username
  }, */
router.post("/", checkAuth,
(req, res,next) => {
      // cloudinary
      try{
        const data = {
          image: req.body.ProductImage,
        };
        cloudinary.uploader.upload(data.image, (result) => {
          req.body.imgID = result.public_id,
            req.body.imgurl = result.secure_url
            next()
        })
      }
      catch(error)
      {
            res.status(500).send({
              message: "failure",
              error,
            });
      };
          }
            ,CarsController.cars_create_product);

router.get("/:carId", CarsController.cars_get_product);
//update info of car time with update product
//can update info of car at any time
//requres auth header token
router.patch("/:carId", CarsController.cars_update_product);
//deletes car requires auth header toker
router.delete("/:productId", CarsController.cars_delete);

module.exports = router;