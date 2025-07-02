// // post
// fetch("http://localhost:3000/posts", {
//   method: "post",
//   headers: { "content-type": "application/json" },
//   body: JSON.stringify({ id: 9, title: "fetch 연습", author: "test02" }),
// }) // 따로 요청사항이 없다면 기본방식은 get
//   .then((res) => res.json())
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => console.log(err));

fetch("http://localhost:3000/posts/9", {
  method: "delete",
}) // 따로 요청사항이 없다면 기본방식은 get
  .then((res) => res.text())
  .then((result) => {
    console.log(result);
  })
  .catch((err) => console.log(err));
