const fs = require("fs");
console.log("start");
// fs.readFile("./sample/output.log", "utf8", (err, data) => {
//   if (err) {
//     throw err;
//   }
//   console.log(data);
// }); // 비동기처리< -- > readFileSync() 동기 처리
// let data = fs.readFileSync("./sample/output.log", "utf8");
// console.log(data);
fs.writeFile("./sample/write.txt", "글쓰기연습용입니다.", "utf8", (err) => {
  if (err) throw err;
  console.log("쓰기 완료");
});
console.log("end");
