const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const data = require('./api/data.js') ;
const productRoutes = require("./api/routes/productRouter");
const userRoutes = require('./api/routes/users');
////please get mongodb cluster online
mongoose.connect('mongodb+srv://jay:jay@senior@cluster0.bd5dq.mongodb.net/userDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(() => {
    console.log("MongoDB Connected…")
  })
  .catch(err => console.log(err));
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use('api/controllers/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.get('/api/products',(req,res) => {
  res.send(data.products);
});

// Routes which should handle requests
app.use("/products", productRoutes);
app.use("/user", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});


app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
