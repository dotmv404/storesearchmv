const express = require("express");
const router = express.Router();
const { searchProducts } = require("../controllers/apiController");

router.get("/", searchProducts);

module.exports = router;
