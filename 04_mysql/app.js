const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const xlsx = require("xlsx");

require("dotenv").config({ path: "./sql/.env" });
const mysql = require("./sql");
const nodeMailer = require("./nodemailer");
console.log(process.env.HOST);
console.log(process.env.USER);
const app = express();
app.use(bodyParser.json()); // urlencoded 사용가능하게 해주거나 json타입으로 파싱을 도와준다
app.get("/", (req, res) => {
  res.send("Root 경로");
});
app.get("/email", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.post("/email", async (req, res) => {
  try {
    let result = await nodeMailer.sendEmail(req.body.param);
    console.log(req.body);
    //res.send(result);
    res.json({ retCode: "success", retVal: result });
  } catch (error) {
    console.log("Error=>", error);
    //res.send(error);
    res.json({ retCode: "fail" });
  }
});

// 파일 업로드 multer
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    // 저장 경로
    callback(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // 업로드 파일명
    let fn = Buffer.from(file.originalname, "latin1").toString("utf-8");
    cb(null, Date.now() + "_" + fn);
  },
});
// multer instance 생성
const upload = multer({
  storage: storage,
  limits: { filesSize: 5 * 1024 * 1024 },
});
const downloadExcel = async () => {
  const workExcel = xlsx.utils.book_new(); // xlsx 가상 생성
  const customers = await mysql.query("customerList"); // 조회 쿼리 실행

  const firstXlsx = xlsx.utils.json_to_sheet(customers, {
    header: ["id", "name", "email", "phone", "address"],
  });
  firstXlsx["!cols"] = [
    { wpx: 50 },
    { wpx: 200 },
    { wpx: 200 },
    { wpx: 140 },
    { wpx: 200 },
  ];
  xlsx.utils.book_append_sheet(workExcel, firstXlsx, "customers");
  xlsx.writeFile(workExcel, "./xlsx/customersFromDB.xlsx");
};
downloadExcel();
app.use(
  express.json({
    limit: "50mb",
  })
);

app.get("/download/customers", async (req, res) => {
  const workExcel = xlsx.utils.book_new(); // xlsx 가상 생성
  const customers = await mysql.query("customerList"); // 조회 쿼리 실행
  const firstXlsx = xlsx.utils.json_to_sheet(customers, {
    header: ["id", "name", "email", "phone", "address"],
  });
  firstXlsx["!cols"] = [
    { wpx: 50 },
    { wpx: 200 },
    { wpx: 200 },
    { wpx: 140 },
    { wpx: 200 },
  ];
  xlsx.utils.book_append_sheet(workExcel, firstXlsx, "customers");
  res.setHeader("Content-disposition", "attachment; filename=Customer.xlsx");
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.end(Buffer.from(xlsx.write(workExcel, { type: "base64" }), "base64"));
});

// 첨부파일 발송 화면
app.get("/excel", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "excel.html"));
});
//  단일 첨부파일 처리 화면
app.post("/excel", upload.single("myFile"), (req, res) => {
  console.log(req.file); // 업로드된 파일 정보 확인
  console.log(req.body); // 요청된 몸체 확인
  const workbook = xlsx.readFile(`./uploads/${req.file.filename}`);
  const firstSheetName = workbook.SheetNames[0]; // 첫번째 시트
  // 시트명으로 첫번째 시트가져오기
  const firstSheet = workbook.Sheets[firstSheetName];
  //첫번째 시트의 json을 객체로 변환
  const firstSheetJson = xlsx.utils.sheet_to_json(firstSheet);
  // 반복문 활용 - insert
  // const data = "";
  // firstSheetJson.forEach((items) => {
  //   data.append({
  //     name: items.name,
  //     phone: items.phone,
  //     email: items.email,
  //     address: items.address,
  //   });
  //   res.send(data);
  // });
  let fsj = firstSheetJson.sort((n, m) => {
    return n.name > m.name;
  });
  fsj.forEach(async (items) => {
    let result = await mysql.query("customerInsert", items);
  });
  // let insertSheet = {name:firstSheetJson[name] , phone : "phone" , email : "email" , address:"address"}

  // console.log(firstSheetJson);

  if (!req.file) {
    res.send("파일 업로드 가능");
  } else {
    res.send("업로드 완료");
  }
});

// // fetch 사용 -- 조회
// app.get("/customers", (req, res) => {
//   mysql
//     .query("customerList")
//     .then((result) => res.send(result))
//     .catch((err) => res.send("Error=>", err));
// });

// // async 사용 -- 조회
app.get("/customers", async (req, res) => {
  try {
    let result = await mysql.query("customerList");
    console.log(result);
    res.send(result);
  } catch (err) {
    res.send("Error=>", err);
  }
});

// // post -- 추가
app.post("/customer", async (req, res) => {
  try {
    //res.send(req.body);
    console.log(req.body.param);
    let data = req.body.param;
    let result = await mysql.query("customerInsert", data);
    res.send(result);
  } catch (err) {
    res.send("Error=>", err);
  }
});

app.put("/customer", async (req, res) => {
  try {
    console.log(req.body.param);
    let data = req.body.param;
    let result = await mysql.query("customerUpdate", [data, 7]);
    console.log(result);
    res.send(result);
  } catch {
    (err) => res.send("Error=>", err);
  }
});

app.delete("/customer/:id", async (req, res) => {
  try {
    console.log(req.params);
    let { id } = req.params;
    let result = await mysql.query("customerDelete", id);
    console.log(result);
    res.send(result);
  } catch (err) {
    res.send("Error=>", err);
  }
});

app.listen(3000, () => {
  console.log("http://localhost:3000 running");
});
// // select * from custmers
// pool.query("select * from customers", (err, result) => {
//   if (err) {
//     console.log("처리중입니다.", err);
//   } else {
//     console.log(result);
//   }
// });

// insert
// let data = ["json", "json@yedam.ac", "010-5392-1342"];
// pool.query(
//   "insert into customers(name , email, phone) values(?,?,?)",
//   data,
//   (err, result) => {
//     if (err) {
//       console.log("처리중입니다.", err);
//     } else {
//       console.log(result);
//     }
//   }
// );
// // set 을 이용한 insert
// data = {
//   name: "Lee",
//   email: "123aa@yedam.ac",
//   phone: "010-2323-1423",
//   address: "",
// };
// pool.query("insert into customers set ?", data, (err, result) => {
//   if (err) {
//     console.log("처리중입니다.", err);
//   } else {
//     console.log(result);
//   }
// });
// // update
// data = {
//   email: "leewoongjae001@yedam.ac",
// };
// pool.query("update customers set ? where name = 'Lee'", data, (err, result) => {
//   if (err) {
//     console.log("처리중입니다.", err);
//   } else {
//     console.log(result);
//   }
// });

// query("customerUpdate", {
//   email: "trytest@yedam.ac",
// });
