const express = require("express");
const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
require("dotenv").config({ path: "./mysql/.env" });
const bodyParser = require("body-parser");
const { query } = require("./mysql/index.js");
const app = express();

// 업로드 경로 확인
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
app.use(bodyParser.json({ limit: "10mb" }));
// body-parser를 따로 import 안하고 express모듈에 내장된 기능으로 사용하려면
// -- app.use(express.json());
app.use(cors());
app.listen(3000, () => {
  console.log("http://localhost:3000");
});
app.get("/", (req, res) => {
  res.send("Root Router");
});
app.get("/fileupload", (req, res) => {
  //res.sendFile(__dirname + "public/index.html");
  res.sendFile(path.join(__dirname, "public", "index.html")); // path모듈 사용시
});
// 다운로드
app.get("/download/:productId/:fileName", (req, res) => {
  const { productId, fileName } = req.params;
  const filepath = `${__dirname}/uploads/${productId}/${fileName}`; // d:/dev/git/node/node.js/05_project/ --> __dirname
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
app.post("/upload/:filename/:pid/:type", (req, res) => {
  const { filename, pid, type } = req.params;
  //const filePath = `${__dirname}/uploads/${pid}/${filename}`;
  let productDir = path.join(uploadDir, pid);
  if (!fs.existsSync(productDir)) {
    fs.mkdirSync(productDir);
  }
  const safeFilename = path.basename(filename);
  console.log(safeFilename);
  const filePath = path.join(productDir, safeFilename);
  let data = req.body.data.slice(req.body.data.indexOf(";base64,") + 8);
  fs.writeFile(filePath, data, "base64", async (err) => {
    // 같은 이름의 파일이 존재하는 경우 덮어쓰기 자동 실행
    await query("productImageInsert", [
      { product_id: pid, type: type, path: filename },
    ]);
    if (err) {
      res.send("Occurred Error");
    } else {
      res.send("success");
    }
  });
});
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

app.get("/todoList", async (req, res) => {
  const result = await query("todoList");
  console.log(result);
  res.json(result);
});

app.delete("/todo/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query("todoDelete", id);
    res.json(result);
  } catch (err) {
    res.json(err);
  }
});
