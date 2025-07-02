const path = require("path");
console.log(__filename); // 현재 경로 출력
console.log(path.basename(__filename)); // 출발지기준으로 제일 마지막 경로에 있는 파일 이름
console.log(path.basename(__filename, ".js")); // 확장자 제거

let result = path.format({
  base: "sample.txt",
  dir: "/home/temp",
});
console.log(result);

result = path.parse("home/temp/sample.txt");
console.log(result);
