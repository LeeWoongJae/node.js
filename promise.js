const promise = new Promise(function (res, rej) {
  // res : 성공했을경우 반환 , rej : 실패했을경우 반환
  setTimeout(function () {
    rej({ id: "test01", name: "User" });
  }, 2000); // 페이지 호출후 결과 반환할때 많이 사용
});
promise //
  .then(function (result) {
    console.log(result.res);
  })
  .catch(function (err) {
    console.log(err);
  });
