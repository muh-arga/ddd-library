const express = require("express");
const MemberController = require("../http/MemberController");

const router = express.Router();

router.use("/", MemberController);

module.exports = router;
