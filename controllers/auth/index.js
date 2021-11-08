const fs = require("fs");
const SHA256 = require("crypto-js/sha256");
const { createUserInDb, getUserFromDb } = require("../mongo/users.js");

module.exports = {
  registerResponse: async function (ctx) {
    const { password } = ctx.request.body;
    const userData = await getUserFromDb(ctx.request.body.email);
    if (userData) {
      ctx.status = 426;
      ctx.body = {
        email: "User with this email exist",
      };
    } else {
      const user = {
        ...ctx.request.body,
        hash: SHA256(password),
      };
      createUserInDb({ ...user });
      ctx.body = user;
    }
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
