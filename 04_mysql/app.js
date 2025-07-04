const mysql = require("./sql");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./sql/.env" });
console.log(process.env.HOST);
console.log(process.env.USER);
const app = express();
app.use(bodyParser.json()); // urlencoded 사용가능하게 해주거나 json타입으로 파싱을 도와준다
app.get("/", (req, res) => {
  res.send("Root 경로");
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
