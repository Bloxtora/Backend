let express = require("express");
let passport = require("passport");
let bcrypt = require("bcrypt");
const jsonwt = require("jsonwebtoken");
const fetch = require('node-fetch')

const secret = process.env.HCAPTCHA_SECRET_KEY;

let User = require("../../models/User");
let Identitycounter = require("../../models/Identitycounter");
let key = require("../../mysetup/myurl");
const saltRounds = 10;

let router = express.Router();

async function verifyCaptcha(token) {
  const url = `https://hcaptcha.com/siteverify?secret=${secret}&response=${token}`;

  await fetch(url, {
    method: 'post'
  })
    .then(response => response.json())
    .then(captcha_response => {
      if (captcha_response.success == true) {
        return true
      } else {
        return false
      }
    })
    .catch(error => {
      return error
    });
}

function testReturn(ret) {
  return ret
}

router.post("/signup", async (req, res) => {
  if (req.body.name && req.body.password && req.body.token) {
    let newUser = new User({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email || null,
      time: Date.now(),
      followerCount: 0,
      followers: [],
      following: ["1"],
      inventory: [],
      admin: false,
      banned: false,
      gems: 0,
      prisms: 0,
      communities: [],
      notifications: [],
      friends: [],
      requests: []
    });
    await User.findOne({ name: newUser.name })
      .then(async profile => {
        if (!profile) {
          const url = `https://hcaptcha.com/siteverify?secret=${secret}&response=${req.body.token}`;

          await fetch(url, {
            method: 'post'
          })
            .then(response => response.json())
            .then(captcha_response => {
              if (captcha_response.success == true) {
                bcrypt.hash(newUser.password, saltRounds, async (err, hash) => {
                  if (err) {
                    console.log("Error is", err.message);
                  } else {
                    console.log(`New account created: ${req.body.name}`)
                    newUser.password = hash;
                    await newUser
                      .save()
                      .then(() => {
                        res.status(200).send(newUser);
                      })
                    console.log(newUser._id)
                    newusernew = newUser._id
                    newusernew = newusernew.toString()
                    let checker = "1"
                    User.findOne({ _id: checker })
                    .then(async updatemain => {
                     console.log(updatemain)
                    updatemain.updateOne(
                    { $push: { followers: newusernew } },
                    (err, brote) => {
                    })
                    updatemain.updateOne(
                    { $inc: { followerCount: 1 } },
                    (err, brote) => {
                    })

                  })
                  }
                })
              } else {
                res.send("Invalid hCaptcha response");
              }
            })
            .catch(error => {
              console.log("Error is", err.message);
            });
        } else {
          res.json({"error":"User already exists..."});
        }
      })
      .catch(err => {
        console.log("Error is", err.message);
      });

  } else {
    res.send("One of the fields required is blank")
  }
});

router.post("/login", async (req, res) => {
          const url = `https://hcaptcha.com/siteverify?secret=${secret}&response=${req.body.token}`;
          await fetch(url, {
            method: 'post'
          })
            .then(response => response.json())
            .then(captcha_response => {
              if (captcha_response.success == true) {
  let newUser = {};
  newUser.name = req.body.name;
  newUser.password = req.body.password;
   User.findOne({ name: newUser.name })
    .then(profile => {
      if (!profile) {
        res.send({"error":"User not exist: " + req.body.name});
      } else {
        bcrypt.compare(
          newUser.password,
          profile.password,
          async (err, result) => {
            if (err) {
              console.log("Error is", err.message);
            } else if (result == true) {
              //   res.send("User authenticated");
              const payload = {
                id: profile.id,
                name: profile.name
              };
              jsonwt.sign(
                payload,
                key.secret,
                { expiresIn: 120000 },
                (err, token) => {
                  if (err) {
                    console.log("Error is ", err.message);
                  }
                  res.json({
                    success: true,
                    token: "Bearer " + token
                  });
                }
              );
            } else {
              res.send({"error":"User Unauthorized Access"});
          }
          })
      }

                })
              } else {
                res.send("Invalid hCaptcha response");
              }
            })
});

router.get(
  "/whoami",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name
    });
  }
);

module.exports = router;