const express = require("express");
const router = express.Router();

router.route("/check").post((req, res) => {
  res.status(200).json({
    status: "success",
    data: {},
    message: "Client route working fine.",
  });
});

module.exports = router;
