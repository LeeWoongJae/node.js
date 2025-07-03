const express = require("express");
const router = express.Router();
// 1. 라우팅 정보 생성
router.get("/customers", (req, res) => {
  res.send("/customer root directory");
});

router.post("/insert", (req, res) => {
  res.send("/customer post requestion");
});

router.put("/update", (req, res) => {
  res.send("/customer update requestion");
});

router.delete("/delete", (req, res) => {
  res.send("/customer delete requestion");
});

module.exports = router;
