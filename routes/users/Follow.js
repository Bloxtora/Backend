// Hello Raj!
//also, you broke upvote,downvote,follow, and unfollow
// How are you?
// - Dragonism
//hi
//can you make it so all created accounts auto follow Bloxtora account?

let express = require("express");
let passport = require("passport");
let bcrypt = require("bcrypt");
const jsonwt = require("jsonwebtoken");
const hcaptcha = require('express-hcaptcha');
let User = require("../../models/User");
let router = express.Router();

router.post("/follow", passport.authenticate("jwt", { session: false }),
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
            if (results2.following.includes(req.body.id)) {}
            else {
              results.updateOne(
                { $inc: { followerCount: 1 } },
                (err, brote) => {
                })
              results.updateOne(
                { $push: { followers: req.user.id } },
                (err, brote) => {
                })
              results2.updateOne(
                { $push: { following: req.body.id } },
                (err, brote) => {
                })
                res.send(results)
            }
          }
        })
      }
    })
  })
module.exports = router 