let express = require("express");
let passport = require("passport");
let bcrypt = require("bcrypt");
const jsonwt = require("jsonwebtoken");
const hcaptcha = require('express-hcaptcha');
let User = require("../../models/User");
let router = express.Router();

router.post("/unfollow", passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const query = User.where({ _id: req.body.id });
    const query2 = User.where({ _id: req.user.id });
    query.findOne(function(err, results) {
      if (err) return handleError(err);
      if (results) {
        //results = person who is getting followed
        //results2 = person who is following 
        query2.findOne(function(err, results2) {
          if (err) return handleError(err);
          if (results2) {
            if (results2.following.includes(req.body.id)) {
                   results.updateOne(
                { $inc: { followerCount: -1 } },
                (err, brote) => {
                })
              results.updateOne(
                { $pull: { followers: req.user.id } },
                (err, brote) => {
                })
              results2.updateOne(
                { $pull: { following: req.body.id } },
                (err, brote) => {
                })
                res.send(results)
            }
            else {
              
            }
          }
        })
      }
    })
  })

module.exports = router