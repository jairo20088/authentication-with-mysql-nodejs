const express = require("express");
const router = express.Router();

const authController = require("../controller/auth");

router.get("/signin", authController.getAuth);

router.get("/signup", authController.getSignup);

router.post("/signup", authController.postSignup);

module.exports = router;
