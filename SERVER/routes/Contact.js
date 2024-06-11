const express = require("express");
const { contactUsController } = require("../controllers/contactUs");
const router = express.Router();

router.post("/contact", contactUsController);

module.exports = router;
