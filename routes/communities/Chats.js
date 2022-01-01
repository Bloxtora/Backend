let express = require("express");
let passport = require("passport");
let bcrypt = require("bcrypt");
const jsonwt = require("jsonwebtoken");
const hcaptcha = require('express-hcaptcha');
let Message = require("../../models/Community");
let router = express.Router();

router.post("/message", passport.authenticate("jwt", { session: false }),
    (req, res) => {
      console.log(req.user)
      if (req.body.text) {
      const query = Message.where({ _id: req.body.orignal });
      query.findOne(function(err, results) {
        if (err) return handleError(err);
        if (results) {
          console.log(results)
        if (results.members.includes(req.user._id)) {
        let newMessage = {
          sender: req.user.name,
          senderId: req.user._id,
          text: req.body.text,
          time: Date.now(),
          orignal: req.body.orignal
        }
      res.send(newMessage)

          results.updateOne(
            { $push: { chat: newMessage } },
            (err, brote) => {
            })
                } else {
res.send("You must join the group first.")
                }
        }
      })
      } else {
        res.send("One of the fields required is blank.")
      }
})

module.exports = router