// // // post
// async function json_fnc() {
//   let promise = await fetch("http://localhost:3000/posts", {
//     method: "post",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ id: 5, title: "5 fetch 연습", author: "test05" }),
//   }); // 따로 요청사항이 없다면 기본방식은 get

//   let resolve = await promise.json();
//   console.log("결과값=>" + resolve);

//   promise = await fetch("http://localhost:3000/posts");
//   resolve = await promise.json();
//   console.log("조회결과=>" + resolve);
// }
// json_fnc();

// // put
async function json_fnc() {
  let promise = await fetch("http://localhost:3000/posts/3", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: 3,
      title: "3 fetch 수정연습",
      author: "test05",
    }),
  }); // 따로 요청사항이 없다면 기본방식은 get

  let resolve = await promise.json();
  console.log("결과값=>" + resolve);

  promise = await fetch("http://localhost:3000/posts");
  resolve = await promise.json();
  console.log("조회결과=>" + resolve);
}
json_fnc();

// 삭제후 결과를 다시 조회하는 fetch(복잡해지고 페이지가 많아지면 코드읽기가 힘듦)
// fetch("http://localhost:3000/posts/9", {
//   method: "delete",
// })
//   .then((res) => res.json())
//   .then((result) => {
//     console.log(result);
//     return fetch("http://localhost:3000/posts");
//   })
//   .then((res) => res.json())
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => console.log(err));
