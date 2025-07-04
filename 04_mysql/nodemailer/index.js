const nodemailer = require("nodemailer");
require("dotenv").config({ path: "../sql/.env" });
const config = {
  host: "smtp.daum.net",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USEREMAIL,
    pass: process.env.USERSECPASSWORD,
  },
};

const sendEmail = async (data) => {
  // Promise 객체로 반환
  return new Promise(async (resolve, reject) => {
    let tp = nodemailer.createTransport(config);
    try {
      let result = await tp.sendMail(data);
      console.log("Success\n", result);
      resolve(result);
    } catch (error) {
      console.log("Fail\n", error);
      reject(error);
    }
  });
};

module.exports = { sendEmail };

// tp.sendMail({
//   from: process.env.USEREMAIL,
//   to: "dsa00340@naver.com",
//   subject: "세번째 연습용 이메일입니다",
//   text: "너가 뭘 할수 있는데?",
// });
