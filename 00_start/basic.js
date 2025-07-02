const { members, add, getPerson } = require("./data.js");
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

let ary = [1, 2, 3, 7, 8, 9];
let ary2 = [4, 5, 6];
let result = [...ary, ...ary2];
console.log(...ary);
console.log(result);
console.log(...result);

// obj Destructuring
let { firstName, lastName, email } = getPerson(); // {firstName , lastName, ...} -- 변수명이 일치되어야 매칭 되는건가?
console.log(firstName, lastName, email);

// ary Destructuring
function getScores() {
  return [70, 80, 90, 10, 20, 30, 45];
}

let [x, y, ...z] = getScores();
console.log(x, y, z);

// function sumAry(ary = []) {
//   let sum = 0;
//   for (let num of ary) {
//     sum += num;
//   }
//   console.log(`ary[] 합계 : ${sum}`);
// }
// sumAry(z);

function sumAry(...ary) {
  let sum = 0;
  for (let num of ary) {
    sum += num;
  }
  console.log(`...ary 합계 : ${sum}`);
}
sumAry(1, 2, 3, 4, 5);
