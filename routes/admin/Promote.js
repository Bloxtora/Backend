let express = require("express");
let passport = require("passport");
let User = require("../../models/User");
let Staff = require("../../models/Staff");
let router = express.Router();

router.post("/promote", passport.authenticate("jwt", { session: false }), (req, res) => {
  if (req.body.user ** req.body.loginName) {
    if (req.body.rank) {
      if (req.body.discord) {
        const query3 = User.where({ name: req.body.name });
        const query2 = User.where({ StaffName: req.body.user });
        const query = User.where({ name: req.user.name });
        query.findOne(function (err, results) {
          if (err) return handleError(err);
          if (results) {
            if (results.admin == true) {
              query2.findOne(function (err, results2) {
                if (err) return handleError(err);
                if (results2) {
                  let newStaff = new Staff({
                    'GameName': req.body.loginName,
                    'StaffName': results2.name,
                    'StaffLevel': req.body.rank,
                    'GroupId': "",
                    'DiscordId': req.body.discord,
                    'FinishedSem': false,
                    'SeminarId': 1,
                    'AccActive': true
                  });
                  async function allDone() {
                  await newStaff
                    .save()
                    .then(() => {
                      query3.findOne(function (err, results3) {
                        if (err) return handleError(err);
                        if (results3) {
                          results3.updateOne(
                            { $set: { admin: true } },
                            (err, brote) => {
                            })
                      res.send("Done")
                        }
                      })
                    })
                  } allDone()
                } else {
                  res.send('no results2')
                }
              })
            } else {
              res.send("no results admin")
            }
          } else {
            res.send("no results")
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