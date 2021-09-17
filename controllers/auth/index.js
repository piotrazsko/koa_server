const fs = require("fs");

function setUser(data) {
  let rawdata = fs.readFileSync("user.json");
  let users = JSON.parse(rawdata);
  let savedData = JSON.stringify(data);
  fs.writeFileSync("user.json", savedData);
}

let users = [
  {
    id: 0,
    email: "test@test.com",
    firts_name: "John",
    last_name: "Gold",
    data: "10.10.2021",
    hash: "CEC6A5B064436B39D473772B5BF5985D8B02D5D64EF853AC66CD4A6683D605EC",
  },
  {
    email: "test@test.ru",
    id: 1,
    firts_name: "Jack",
    last_name: "Daniels",
    data: "10.10.2021",
    hash: "0B1E5B9806824E71F045D07C03DB1E9959F560FC3ED7E117EC2FD05E0E334EBD",
  },
];

module.exports = {
  registerResponse: async function (ctx) {
    const user = {
      ...ctx.request.body,
      hash: "D135B5130CD6B446693ECB1CFE81E3721F66079F",
    };
    users.push(user);
    ctx.body = user;
  },
  loginResponce: async function (ctx) {
    ctx.body = users.find((i) => i.email === ctx.request.body.email);
  },
};
