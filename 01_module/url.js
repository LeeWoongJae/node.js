const url = new URL(
  "https://user:pass@sum.example.com:8080/a/b/c?query=name&num=1#mode"
);
console.log(url);
let paramtest = url.searchParams;
// console.log(paramtest.get("username"));
console.log(paramtest.get("query"));
console.log(paramtest.get("num"));
