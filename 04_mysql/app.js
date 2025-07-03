const mysql = require("mysql2");
const custSql = require("./sql/customerSql");
const pool = mysql.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "dev01",
  password: "dev01",
  database: "dev",
  connectionLimit: 10,
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
let data = ["json", "json@yedam.ac", "010-5392-1342"];
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
function query(alias, values) {
  pool.query(custSql[alias], values, (err, result) => {
    if (err) {
      console.log("처리중입니다.", err);
    } else {
      console.log(result);
    }
  });
}
query("customerUpdate", {
  email: "trytest@yedam.ac",
});
