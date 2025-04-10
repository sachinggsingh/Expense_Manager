const express = require("express");
const userCTRL = require("../controller/user");
const router = express.Router();

router.route('/register').post(userCTRL.register)
router.route('/login').post(userCTRL.login)
router.route('/logout').post(userCTRL.logout)

module.exports = router;