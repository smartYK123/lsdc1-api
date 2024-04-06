

const { createPost } = require("../controllers/post");
// const {parseData} = require("../middleware");
const multer = require("../middleware/multer");
const { postValidator, validate } = require("../middleware/postValidator");
const router = require("express").Router();

router.post(
  "/send-data",
  multer.single("picture"),
  createPost
);

module.exports = router;
