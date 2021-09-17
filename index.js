const logger = require("koa-logger");
const router = require("@koa/router")();
const koaBody = require("koa-body");
const offers = require("./responses/offers.json");
const featuredOffers = require("./responses/offers.json");
const notifications = require("./responses/notifications.json");
const history = require("./responses/history.json");
const upcoming = require("./responses/upcoming.json");

//more
const languages = require("./responses/languages.json");
const external_data = require("./responses/external_data.json");
const term_of_use = require("./responses/term_of_use.json");
const privacy = require("./responses/privacy_policy.json");
const about_app = require("./responses/about_app.json");
const facilities = require("./responses/facilities.json");
const {
  groupLanguagesResponce,
  groupSizesResponce,
  citiesResponce,
} = require("./controllers/selects");

const Koa = require("koa");
const app = (module.exports = new Koa());

// "database"

const posts = [];

// middleware

// app.use(bodyParser());
app.use(logger());

// app.use(render);

app.use(koaBody());

// route definitions

router
  .get("/", listResponse)
  .post("/auth", authResponse)
  .post("/register", registerResponse)
  .get("/user/:id", getUserResponse)
  .get("/users", getUsersResponse)
  .put("/user/:id", putUserResponse)
  .delete("/user/:id", deleteUserResponse)
  .post("/user", postUserResponse)
  .get("/notifications", notificationsResponse)
  .get("/history-visits", historyResponse)
  .get("/upcoming-visits", upcomingResponse)
  .get("/posts", listResponse)
  .get("/posts", listResponse)
  .get("/featured-offers", featuredOffersResponse)
  .get("/offers", offersResponse)
  .get("/offers-details/:id", offerDetailsResponse)
  .post("/book-visit", bookVisitResponse)
  .get("/languages", languagesResponse)
  .get("/about-app", aboutAppResponse)
  .get("/privacy-policy", privacyResponse)
  .get("/terms-of-use", termOfUseResponse)
  .get("/external-data", extternalResponse)
  .get("/facilities", facilitiesResponse)
  // selects
  .get("/cities", citiesResponce)
  .get("/group-languages", groupLanguagesResponce)
  .get("/group-sizes", groupSizesResponce);

app.use(router.routes());

/**
 * Post listing.
 */

let users = [
  { id: 0, firts_name: "John", last_name: "Gold", data: "10.10.2021" },
  { id: 1, firts_name: "Jack", last_name: "Daniels", data: "10.10.2021" },
];

//auth

async function registerResponse(ctx) {
  ctx.body = users;
}

async function authResponse(ctx) {
  ctx.body = users;
}

// user/

async function getUsersResponse(ctx) {
  // console.log(ctx.params);
  ctx.body = users;
}
async function getUserResponse(ctx) {
  // console.log(ctx.params);
  ctx.body =
    users.find((item) => item.id == ctx.params.id) || !ctx.params.id
      ? users[0]
      : ctx.throw(400, "Error Message");
}

async function postUserResponse(ctx) {
  users.push({ id: users.length, ...ctx.request.body });
  ctx.body = users;
}

async function putUserResponse(ctx) {
  users = users.map((item) => {
    return item.id == ctx.params.id ? { ...item, ...ctx.request.body } : item;
  });
  ctx.body = users;
}
async function deleteUserResponse(ctx) {
  users = users.filter((item) => {
    return item.id != ctx.params.id;
  });
  ctx.body = users;
}

async function listResponse(ctx) {
  ctx.body = { message: "Covid 19: update for visitors" };
}
async function notificationsResponse(ctx) {
  ctx.body = notifications;
}
async function historyResponse(ctx) {
  ctx.body = history;
}
async function upcomingResponse(ctx) {
  ctx.body = upcoming;
}
async function languagesResponse(ctx) {
  ctx.body = languages;
}
async function aboutAppResponse(ctx) {
  ctx.body = about_app;
}
async function privacyResponse(ctx) {
  ctx.body = privacy;
}
async function termOfUseResponse(ctx) {
  ctx.body = term_of_use;
}
async function extternalResponse(ctx) {
  ctx.body = external_data;
}
async function facilitiesResponse(ctx) {
  ctx.body = facilities;
}

async function bookVisitResponse(ctx) {
  console.log(ctx, ctx.params);
  ctx.body = {
    status: "confirmed",
  };
}

async function offersResponse(ctx) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      ctx.body = offers;
      resolve();
    }, 1000);
  });
}

async function offerDetailsResponse(ctx) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      ctx.body = offers.find((i) => i.id == ctx.params.id);
      resolve();
    }, 1000);
  });
}

async function featuredOffersResponse(ctx) {
  ctx.body = featuredOffers;
}

if (!module.parent) app.listen(3000);
