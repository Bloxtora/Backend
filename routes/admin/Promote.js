let express = require("express");
let passport = require("passport");
let bcrypt = require("bcrypt");
const jsonwt = require("jsonwebtoken");
const hcaptcha = require('express-hcaptcha');
let User = require("../../models/User");
let Staff = require("../../models/Staff");
let router = express.Router();

router.post("/promote", passport.authenticate("jwt", { session: false }), (req, res) => {
  if (req.body.user) {
    if (req.body.rank) {
      if (req.body.discord) {
        const query = Staff.where({ StaffName: req.user.name });
        const query2 = User.where({ name: req.body.user });
        query.findOne(function (err, results) {
          if (err) return handleError(err);
          if (results) {
            if (results.admin == true) {
              query2.findOne(function (err, results) {
                if (err) return handleError(err);
                if (results2) {
                  let newStaff = new Staff({
                    'GameName': "",
                    'StaffName': results2.name,
                    'StaffLevel': req.body.rank,
                    'GroupId': "",
                    'DiscordId': req.body.discord
                  });
                  async function allDone() {
                  await newStaff
                    .save()
                    .then(() => {
                      res.send("Done")
                    })
                  } allDone()
                } else {
                  res.send('err')
                }
              })
            } else {
              res.send("err")
            }
          } else {
            res.send("err")
          }
        })
      } else {
        res.send("Must have a discord.")
      }
    } else {
      res.send("Must have a rank.")
    }
  } else {
    res.send("Must have a user.")
  }
})

module.exports = router