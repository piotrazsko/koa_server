const fs = require("fs");
const translate = {};
translate.en = require("./en.json");
translate.de = require("./de.json");

module.exports = {
  translatesResponse: async function (ctx) {
    ctx.status = 200;
    const data = {
      ...ctx.request.body,
    };
    console.log(ctx.headers);
    if (true) {
      ctx.body = {
        translates: translate[ctx.headers["accept-language"]] || "en",
      };
    } else {
      ctx.status = 426;
      ctx.body = {
        message: "Wrong email",
      };
    }
  },
};
