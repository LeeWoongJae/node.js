const crypto = require("crypto");
let password = crypto
  .createHash("sha512")
  .update("password1234")
  .digest("base64");
// console.log(password); -- 항상 같은 password 패턴을 반환하기 때문에 보안에 취약

// salting 암호화
const createSalt = () => {
  return new Promise((res, rej) => {
    crypto.randomBytes(64, (err, buffer) => {
      if (err) {
        rej(err);
      } else {
        res(buffer);
      }
    });
  });
};
// createSalt().then((res) => {
//   console.log(res.toString("base64"));
// });

// salt방식으로 암호화
const createCryptoPassword = (plainPassword, salt) => {
  return new Promise((res, rej) => {
    crypto.pbkdf2(plainPassword, salt, 10000, 64, "sha512", (err, key) => {
      if (err) {
        rej(err);
      } else {
        res({ salt: salt, password: key.toString("base64") });
      }
    });
  });
};

// Create random salted password
async function main() {
  const salt = await createSalt();

  const password = await createCryptoPassword("1111", salt); // ('변환될값' , '기준');
  console.log(password.password);
}
main();
