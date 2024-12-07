const express = require("express");
const router = express.Router();

router.post("/check", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {},
    message: "Admin route working fine.",
  });
});

module.exports = router;
