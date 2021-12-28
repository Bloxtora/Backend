let express = require("express");
let passport = require("passport");
let bcrypt = require("bcrypt");
const jsonwt = require("jsonwebtoken");
const hcaptcha = require('express-hcaptcha');
let User = require("../../models/User");
let router = express.Router();

router.post("/friend", passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.friends.includes(req.body.id)) {
    res.send("no")
    }else{
    if (req.user.requests.includes(req.body.id)) {
      const query = User.where({ _id: req.body.id });
      const query2 = User.where({ _id: req.user.id });
      query.findOne(function(err, results) {
        if (err) return handleError(err);
        if (results) {
          results.updateOne(
            { $push: { friends: req.user.id } },
            (err, brote) => {
            })
            
        }
      })
      query2.findOne(function(err, results) {
        if (err) return handleError(err);
        if (results) {
          results.updateOne(
            { $push: { friends: req.body.id } },
            (err, brote) => {
            })
            console.log(results)
            results.updateOne(
            { $pull: { requests: req.body.id } },
            (err, brote) => {
            })
        }
      })
      res.send('Added Friend.')
    } else {
      const query = User.where({ _id: req.body.id });
        query.findOne(function(err, results) {
        if (err) return handleError(err);
        if (results) {
          if (results.requests.includes(req.user.id)) {
          
          } else {
                res.send('Request Sent.')
            results.updateOne(
            { $push: { requests: req.user.id } },
            (err, brote) => {
            })
          }
          
        }
      })
    }
    }
  })
module.exports = router