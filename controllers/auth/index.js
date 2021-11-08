const fs = require("fs");
const SHA256 = require("crypto-js/sha256");
const { createUserInDb, getUserFromDb } = require("../mongo/users.js");

let users = [
  {
    id: 0,
    email: "test@test.com",
    first_name: "John",
    last_name: "Gold",
    data: "10.10.2021",
    hash: "CEC6A5B064436B39D473772B5BF5985D8B02D5D64EF853AC66CD4A6683D605EC",
    contact_phone: "+375256666666",
  },
  {
    email: "test@test.ru",
    id: 1,
    first_name: "Jack",
    last_name: "Daniels",
    data: "10.10.2021",
    hash: "0B1E5B9806824E71F045D07C03DB1E9959F560FC3ED7E117EC2FD05E0E334EBD",
    contact_phone: "+375256666666",
  },
];

module.exports = {
  registerResponse: async function (ctx) {
    const { password } = ctx.request.body;
    const user = {
      ...ctx.request.body,
      hash: SHA256(password),
    };
    createUserInDb({ ...user });
    ctx.body = user;
  },

  updateUserResponse: async function (ctx) {
    const user = {
      ...ctx.request.body,
    };

    ctx.body = user;
  },
  changePasswordResponse: async function (ctx) {
    ctx.status = 201;
    const data = {
      ...ctx.request.body,
    };
    const reg = /^\S+@\S+\.\S+$/;
    if (reg.test(data.email)) {
      ctx.body = { message: "We send you email with instructions" };
    } else {
      ctx.status = 426;
      ctx.body = {
        message: "Wrong email",
      };
    }
  },

  resetPasswordResponse: async function (ctx) {
    const data = {
      ...ctx.request.body,
    };

    const reg = /^\S+@\S+\.\S+$/;
    if (reg.test(data.email)) {
      ctx.body = { message: "We send you email with instructions" };
    } else {
      ctx.status = 426;
      ctx.body = {
        message: "Wrong email",
      };
    }
  },

  loginResponce: async function (ctx) {
    const user = await getUserFromDb(ctx.request.body.email);
    if (!user) {
      ctx.status = 426;
      ctx.body = {
        email: "User with this email not found",
      };
    } else if (user.hash !== SHA256(ctx.request.body.password).toString()) {
      ctx.status = 426;
      ctx.body = {
        email: "Check your password or email",
      };
    } else {
      ctx.body = user;
    }
  },
  logoutResponce: async function (ctx) {
    ctx.body = {};
  },
};
