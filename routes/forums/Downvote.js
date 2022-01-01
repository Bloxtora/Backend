let express = require("express");
let passport = require("passport");
let bcrypt = require("bcrypt");
const jsonwt = require("jsonwebtoken");
const hcaptcha = require('express-hcaptcha');
let Post = require("../../models/Subforum");
let router = express.Router();

router.post("/downvote", passport.authenticate("jwt", { session: false }),
  (req, res) => {
if (req.body.downvote && req.body.thread && req.body.orignal) {
      const query = Post.where({ _id: req.body.orignal });
      query.findOne(function(err, results) {
        if (err) return handleError(err);
        if (results) {
          if (results.posts[parseFloat(req.body.thread)].downvotes.includes(req.user._id)) { 
            res.send("error: already voted")
          } else if (results.posts[parseFloat(req.body.thread)].upvotes.includes(req.user._id)) {
let results2 = results

results2.posts[parseFloat(req.body.thread)].votes--
if (results2.posts[parseFloat(req.body.thread)].votes == 0) {
results2.posts[parseFloat(req.body.thread)].votes--
}

results2.posts[parseFloat(req.body.thread)].downvotes.push(req.user._id)

for (let q = 0; q < results2.posts[parseFloat(req.body.thread)].downvotes.length; q++) {
  if (results2.posts[parseFloat(req.body.thread)].upvotes[q] == req.user._id) {
results2.posts[parseFloat(req.body.thread)].upvotes.splice(q, 1)
  }
}
results.updateOne(
{ $set: { posts: results2.posts } },
(err, brote) => {
})
res.send(results)
          } else {
let results2 = results
results2.posts[parseFloat(req.body.thread)].votes--
results2.posts[parseFloat(req.body.thread)].downvotes.push(req.user._id)

results.updateOne(
{ $set: { posts: results2.posts } },
(err, brote) => {
})
             res.send(results2)
        }
        } 
      });
    } else {
      res.send("One of the fields required is blank")
    }
  })

module.exports = router