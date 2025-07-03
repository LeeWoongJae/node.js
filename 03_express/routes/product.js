//const {Router} = require("express"); // 많은 클래스 중에 Router 클래스만 찝어서 가져온다
//const router = Router();
const express = require("express");
const router = express.Router();
// 1. 라우팅 정보 생성
router.get("/products", (req, res) => {
  res.send("/products root directory");
});

router.post("/insert", (req, res) => {
  res.send("/products post requestion");
});

router.put("/update", (req, res) => {
  res.send("/products put requestion");
});

router.delete("/delete", (req, res) => {
  res.send("/products delete requestion");
});

module.exports = router;
