const express = require("express");
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary');
const checkAuth = require('../middleware/check-auth');
const productController = require('../controllers/productController');
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


router.get("/", checkAuth, productController.products_get_all);

router.post("/", checkAuth,
  (req, res, next) => {
    // cloudinary
    try {
      const data = {
        image: req.body.ProductImage,
      };
      cloudinary.uploader.upload(data.image, (result) => {
        req.body.imgID = result.public_id,
          req.body.imgurl = result.secure_url
        next()
      })
    } catch (error) {
      res.status(500).send({
        message: "failure",
        error,
      });
    };
  }, productController.create_product);

router.get("/:id", productController.get_product_details);
//update info of car time with update product
//can update info of car at any time
//requres auth header token

router.post("/createProduct", checkAuth, productController.create_product);
router.post("/checkout", checkAuth, productController.checkout);


module.exports = router;