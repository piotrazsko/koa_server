const history = require("./history.json");
const upcoming = require("./upcoming.json");

module.exports = {
  historyResponse: async function (ctx) {
    ctx.body = history;
  },
  upcomingResponse: async function (ctx) {
    ctx.body = upcoming;
  },
  deleteVisitsResponse: async function (ctx) {
    ctx.body = { message: "success" };
  },
};
