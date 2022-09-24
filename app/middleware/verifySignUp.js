const db = require("../models")
const ROLES = db.ROLES
const User = db.user
const {verify} = require('hcaptcha');
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Error - El usuario ya está siendo utilizado"
      });
      return;
    }
    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Error - El email ya está siendo utilizado"
        })
        return
      }
      next()
    })
  })
}

checkCaptcha = async (req, res, next) => {
  const APP_CAPCHA_ON = process.env.APP_CAPCHA_ON
  if(APP_CAPCHA_ON === "true") {
      let token = req.headers["x-captcha-token"];
      const RECAPTCHA_SERVER_KEY = process.env.RECAPTCHA_SERVER_KEY
      if (!token) {
        return res.status(403).send({
          message: "No se ha entrado Token captcha"
        })
      }
      verify(RECAPTCHA_SERVER_KEY, token)
      .then((data) => {
        console.log(data)
        if (data.success === true) {
          next()
        } else {
          console.log('verification failed')
          return res.status(403).send({
            message: "Ha fallado la verificacion del captcha"
          })
        }
      })
  .catch(console.error);
  } else {
    next()
  }

// The code below will run only after the reCAPTCHA is succesfully validated.
}

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkCaptcha: checkCaptcha
}
module.exports = verifySignUp