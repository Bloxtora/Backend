let express = require("express");
let passport = require("passport");
let bcrypt = require("bcrypt");
const jsonwt = require("jsonwebtoken");
const hcaptcha = require('express-hcaptcha');
let Message = require("../../models/Community");
let User = require("../../models/User");
let router = express.Router();

router.post("/join", passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user)
    if (req.body.text) {
      const query = Message.where({ _id: req.body.orignal });
      query.findOne(function(err, results) {
        if (err) return handleError(err);
        if (results) {
          console.log(results)
          if (results.members.includes(req.user._id)) {
            res.send("You are already in this group.")
          } else {
            results.updateOne(
              { $push: { members: req.user._id } },
              (err, brote) => {
              })
            results.updateOne(
              { $inc: { memberCount: 1 } },
              (err, brote) => {
              })
            const query2 = User.where({ _id: req.user._id });
            query2.findOne(function(err, results2) {
              if (err) return handleError(err);
              if (results2) {
            results2.updateOne(
              { $push: { communities: req.body.orignal } },
              (err, brote) => {
              })
              }
              res.send(results)
            })
          }
        }
      })
    } else {
      res.send("One of the fields required is blank.")
    }
  })

module.exports = router