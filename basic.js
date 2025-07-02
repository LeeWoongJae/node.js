const { members, add } = require("./data.js");
console.log("welcome to xucking hell ");
let myName = "kildong-hong";
let age = 20;

if (age > 20) {
  console.log(`${myName}은 성인입니다.`); // back tip 안에서 jstl 가능
} else {
  console.log(`${myName}은 미성년자입니다.`);
}
console.log(members);
console.log("각 값을 더한 결과는 : " + add(10, 20));
members.forEach((item, idx) => {
  if (idx > 0) console.log(item);
}); // 합수가 매게값 function(item , idx , ary)
