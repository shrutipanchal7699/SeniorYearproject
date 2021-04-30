//author Param Patel
//012421227
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/users");

exports.user_signup = (req, res, next) => {
  User.find({
      email: req.body.email
    })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              pass: req.body.password,
              error: err
            });
          } else {
             const user = new User({
               _id: new mongoose.Types.ObjectId(),
               name: req.body.name,
               email: req.body.email,
               password: hash,
               location: req.body.location,
               certification: req.body.certification,
               description: req.body.description,
               currentBalance: req.body.currentBalance
             });
            user.save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err,
                  here: "123"
                });
              });
          }
        });
      }
    });
};

exports.user_login = (req, res, next) => {
  User.find({
      email: req.body.email
    })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed compare"
          });
        }
        if (result) {
          const token = jwt.sign({
              email: user[0].email,
              _id:user[0]._id,
              userId: user[0]._id
            },
            process.env.JWT_KEY, {
              expiresIn: "10h"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.user_delete = (req, res, next) => {
  User.remove({
      _id: req.userData._Id
    })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
