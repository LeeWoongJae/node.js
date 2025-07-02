const promise = new Promise(function (res, rej) {
  // res : 성공했을경우 반환 , rej : 실패했을경우 반환
  let run = parseInt(Math.random() * 2 + 1);
  setTimeout(function () {
    if (run) {
      res({ id: "user", name: "User" });
    } else {
      rej(new Error("Error 발생"));
    }
  }, 1000); // 페이지 호출후 결과 반환할때 많이 사용
});
promise //
  .then(function (result) {
    console.log(result.res);
  })
  .catch(function (err) {
    console.log(err);
  });
fetch("https://<mock-id>.mock.pstmn.io").then().then();
