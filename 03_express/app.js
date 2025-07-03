// Import modules
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const customerRoute = require("./routes/customer");
const productRoute = require("./routes/product");

const app = express(); // express 서버의 instance 생성
app.use(bodyParser.json());
// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// 파일 업로드 multer
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    // 저장 경로
    callback(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // 업로드 파일명
    cb(null, Date.now() + "_" + file.originalname);
  },
});
// multer instance 생성
const upload = multer({
  storage: storage,
  limits: { filesSize: 5 * 1024 * 1024 },
  fileFilter: function (req, files, cb) {
    const mimetype = /jpg|png|jpeg|gif/.test(files.mimetype);
    if (mimetype) {
      return cb(null, true);
    } else {
      return cb(null, false);
    }
  },
});
// 동일 출처 원칙 -- 모든 서버에 요청 허락
app.use(cors());

app.get("/", (req, res) => {
  // get , post , delete , put
  fs.readFile("./public/index.html", "utf-8", (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});
app.use((err, req, res, next) => {
  console.log(err, req, res);
  next();
});
// 첨부파일 업로드 화면.
app.get("/upload", (req, res) => {
  fs.readFile("./public/upload.html", "utf-8", (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});
// 첨부파일 처리 화면
app.post("/upload", upload.array("myFile"), (req, res) => {
  console.log(req.files); // 업로드된 파일 정보 확인
  console.log(req.body); // 요청된 몸체 확인
  if (!req.files) {
    res.send("이미지 업로드 가능");
  } else {
    res.send("업로드 완료");
  }
});
// app.get("/cus", (req, res) => {
//   res.send('새로운 get 경로입니다("/cus[method:get]")');
// });
// app.post("/cus", (req, res) => {
//   //res.send('새로운 post 경로입니다("/cus[method:post]")');
//   res.json({ id: 12, name: "kildong-hong" });
// });
app.post("/json-data", (req, res) => {
  console.log(req.body);
  res.send("json requestion");
});
app.post("/form-data", (req, res) => {
  console.log(req.body);
  res.send("form requestion");
});

app.use("/customer", customerRoute);
app.use("/product", productRoute);

app.listen(3000, () => {
  console.log("http://localhost:3000 서버가 가동되었습니다.");
});
