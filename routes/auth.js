const express = require("express");
const router = express.Router();

const authController = require("../controller/auth");

router.get("/signin", authController.getAuth);
router.get("/signup", authController.getSignup);

module.exports = router;
