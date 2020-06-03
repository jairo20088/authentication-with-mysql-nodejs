const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const indexController = require("../controller/index");

router.get("/", indexController.getHomepage);

router.get("/blog", auth.isAuth, indexController.getBlog);

router.post("/blog", auth.isAuth, indexController.postBlog);

router.post("/delete", auth.isAuth, indexController.deletePost);

module.exports = router;
