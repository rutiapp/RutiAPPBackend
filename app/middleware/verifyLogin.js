const db = require("../models")
const ROLES = db.ROLES
const User = db.user
const {verify} = require('hcaptcha');
checkCaptcha = async (req, res, next) => {
  const APP_CAPCHA_ON = process.env.APP_CAPCHA_ON
  if(APP_CAPCHA_ON === "true") {
      let token = req.headers["x-captcha-token"]
      const RECAPTCHA_SERVER_KEY = process.env.RECAPTCHA_SERVER_KEY
      if (token) {
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
      }).catch(console.error)
      }
  } else {
    next()
  }

// The code below will run only after the reCAPTCHA is succesfully validated.
}

const verifyLogin = {
  checkCaptcha: checkCaptcha
}
module.exports = verifyLogin