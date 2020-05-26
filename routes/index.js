const express = require("express");
const router = express.Router();

const indexController = require("../controller/index");

router.get("/", indexController.getHomepage);
router.get("/blog", indexController.getBlog);

router.post("/blog", indexController.postBlog);

module.exports = router;
