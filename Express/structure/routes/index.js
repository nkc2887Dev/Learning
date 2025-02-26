const express = require("express");
const router = express.Router();

router.use("/admin", require("./admin/index"));
router.use("/client", require("./client/index"));

module.exports = router;