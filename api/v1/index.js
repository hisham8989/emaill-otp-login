const express = require("express");
const router = express.Router();

// API ROUTES
router.use("/auth", require("./auth.routes"));
router.use("/users", require("./user.routes"));

module.exports = router;
