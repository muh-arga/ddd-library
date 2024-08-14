const express = require("express");
const BookController = require("../http/BookController");

const router = express.Router();

router.use("/", BookController);

module.exports = router;
