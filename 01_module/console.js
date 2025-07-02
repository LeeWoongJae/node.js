/**
 * 01_module > console.js
 */
// Console 클래스 안에 console.js의 내용을 선언
const { Console } = require("console");
const fs = require("fs");
const express = require("express"); // external module
const output = fs.createWriteStream("./sample/output.log", { flags: "a" }); // create File in path
const errlog = fs.createWriteStream("./sample/err.log", { flags: "a" }); // create File in path
const logger = new Console({
  stdout: output,
  stderr: errlog,
});
logger.log("log");
logger.error("에러로그기록하기");
console.log("end");
