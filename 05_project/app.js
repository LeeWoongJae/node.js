const express = require("express");
const mysql = require("mysql2");
const fs = require("fs");
require("dotenv").config({ path: "./mysql/.env" });
const bodyParser = require("body-parser");
const { query } = require("./mysql/index.js");
const app = express();
app.use(bodyParser.json());
// body-parser를 따로 import 안하고 express모듈에 내장된 기능으로 사용하려면
// -- app.use(express.json());

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
app.get("/", (req, res) => {
  res.send("Root Router");
});
// 다운로드
app.get("/download/:productId/:fileName", (req, res) => {
  const { productId, fileName } = req.params;
  const filepath = `${__dirname}/uploads/${productId}/${fileName}`; // d://dev/git/node/node.js/05_project/ --> dirname
  if (!fs.existsSync(filepath)) {
    console.log("파일이 존재하지 않습니다");
    res.send("파일이 존해하지 않습니다.");
  } else {
    res.header(
      "Content-Type",
      `image/${fileName.substring(fileName.lastIndexOf("."))}`
    );

    fs.createReadStream(filepath).pipe(res);
  }
});
// 업로드

// 데이터 쿼리
app.post("/api/:alias", async (req, res) => {
  // localhost:3000/api/productList
  console.log(req.params.alias);
  console.log(req.body.param);
  console.log(req.body.where);

  const result = await query(req.params.alias, req.body.param, req.body.where); // -- productInsert
  // const result = await query(req.params.alias, [], req.body.where); // -- productList용
  res.send(result);
});
