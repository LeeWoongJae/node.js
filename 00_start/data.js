const members = [
  { id: "guest", name: "손님" },
  { id: "user", name: "회원" },
  { id: "admin", name: "admin" },
];

let add = (n1, n2) => n1 + n2;
let getPerson = () => {
  return {
    firstName: "Joshep",
    lastName: "Ben",
    age: 20,
    email: "sss@yedam.ac",
  };
};

module.exports = { members, add, getPerson };
